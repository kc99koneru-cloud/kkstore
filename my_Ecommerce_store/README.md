# KK Store Docker Deployment

Production Docker layout for the KK Store React frontend and Node backend.

## Folder Structure

```text
.
├── backend/
│   ├── src/server.js
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── .dockerignore
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
├── docker-compose.yml
├── .env.example
└── README.md
```

## Local Docker Run

Create the root env file:

```bash
cp .env.example .env
```

Build and start:

```bash
docker compose up -d --build
```

Open:

```text
http://65.0.203.128:6000
```

Health check:

```text
http://65.0.203.128:5000/health
```

## EC2 Deployment

Install Docker and the Compose plugin on the EC2 instance, then clone the repository:

```bash
git clone https://github.com/kc99koneru-cloud/kkstore.git
cd kkstore
```

Create the root env file:

```bash
cp .env.example .env
```

Start the app:

```bash
docker compose up -d --build
```

Make sure the EC2 security group allows inbound TCP on ports `6000` for the frontend and `5000` for the backend.

## Services

- `frontend`: Builds the Vite React app and serves it with Nginx.
- `backend`: Node HTTP API service. Product routes under `/api/products` proxy to DummyJSON.
- `nginx`: The Nginx config lives in `frontend/nginx.conf`; it serves the SPA and proxies `/api` plus `/health` to the backend container.
