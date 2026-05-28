import http from 'node:http';

const PORT = Number(process.env.PORT || 5000);
const HOST = process.env.HOST || '0.0.0.0';
const UPSTREAM_API_URL = process.env.UPSTREAM_API_URL || 'https://dummyjson.com';

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload);

  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body),
    'Access-Control-Allow-Origin': process.env.CORS_ORIGIN || '*',
    'Access-Control-Allow-Methods': 'GET,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  });
  res.end(body);
}

function getTargetUrl(req) {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);

  if (requestUrl.pathname === '/api/products') {
    return `${UPSTREAM_API_URL}/products${requestUrl.search}`;
  }

  if (requestUrl.pathname === '/api/products/search') {
    return `${UPSTREAM_API_URL}/products/search${requestUrl.search}`;
  }

  if (requestUrl.pathname === '/api/products/categories') {
    return `${UPSTREAM_API_URL}/products/categories`;
  }

  if (requestUrl.pathname.startsWith('/api/products/category/')) {
    const category = requestUrl.pathname.replace('/api/products/category/', '');
    return `${UPSTREAM_API_URL}/products/category/${category}${requestUrl.search}`;
  }

  if (requestUrl.pathname.startsWith('/api/products/')) {
    const id = requestUrl.pathname.replace('/api/products/', '');
    return `${UPSTREAM_API_URL}/products/${id}`;
  }

  return null;
}

async function handleApi(req, res) {
  const targetUrl = getTargetUrl(req);

  if (!targetUrl) {
    sendJson(res, 404, { message: 'API route not found' });
    return;
  }

  const upstreamResponse = await fetch(targetUrl, {
    headers: {
      Accept: 'application/json',
    },
  });
  const payload = await upstreamResponse.json();

  sendJson(res, upstreamResponse.status, payload);
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === 'OPTIONS') {
      sendJson(res, 204, {});
      return;
    }

    if (req.url === '/health') {
      sendJson(res, 200, { status: 'ok', service: 'kkstore-backend' });
      return;
    }

    if (req.method === 'GET' && req.url.startsWith('/api/')) {
      await handleApi(req, res);
      return;
    }

    sendJson(res, 404, { message: 'Route not found' });
  } catch (error) {
    sendJson(res, 500, {
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'production' ? undefined : error.message,
    });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`kkstore backend listening on http://${HOST}:${PORT}`);
});
