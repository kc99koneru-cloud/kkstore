const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://65.0.203.128:5000/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, options);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

export const productApi = {
  getProducts: ({ limit = 100, skip = 0, search = '', category = '' } = {}) => {
    if (search) {
      return request(`/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`);
    }

    if (category) {
      return request(`/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`);
    }

    return request(`/products?limit=${limit}&skip=${skip}`);
  },
  getProduct: (id) => request(`/products/${id}`),
  getCategories: () => request('/products/categories'),
};
