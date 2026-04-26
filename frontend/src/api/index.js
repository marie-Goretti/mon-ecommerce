import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api'
});

// Ajoute automatiquement le token JWT à chaque requête
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getProducts = (params) => API.get('/products', { params });
export const getProduct = (id) => API.get(`/products/${id}`);
export const createProduct = (data) => API.post('/products', data);
export const updateProduct = (id, data) => API.put(`/products/${id}`, data);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);

export const getCart = () => API.get('/cart');
export const addToCart = (data) => API.post('/cart', data);
export const removeFromCart = (id) => API.delete(`/cart/${id}`);

export const getCategories = () => API.get('/categories');
export const createCategory = (data) => API.post('/categories', data);
export const updateCategory = (id, data) => API.put(`/categories/${id}`, data);
export const deleteCategory = (id) => API.delete(`/categories/${id}`);

export const getUsers = () => API.get('/users');
export const updateUserRole = (id, data) => API.put(`/users/${id}/role`, data);
export const deleteUser = (id) => API.delete(`/users/${id}`);

export const uploadImage = (formData) => API.post('/upload', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const createOrder = () => API.post('/orders');
export const getUserOrders = () => API.get('/orders/my-orders');
export const getOrderDetails = (id) => API.get(`/orders/${id}`);

export const getAllOrders = () => API.get('/orders/admin/all');
export const updateOrderStatus = (id, data) => API.put(`/orders/${id}/status`, data);