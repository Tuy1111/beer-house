import axios from "axios";
const API_URL = "http://192.168.2.163:4001/api";

export const getMenu = () => axios.get(`${API_URL}/menu`);
export const createOrder = (order) => axios.post(`${API_URL}/orders`, order);
export const getOrders = (table) =>
  axios.get(`${API_URL}/orders`, { params: { table } });
export const updateOrderStatus = (id, status) =>
  axios.put(`${API_URL}/orders/${id}`, { status });
export const deleteOrder = (id) => axios.delete(`${API_URL}/orders/${id}`);

// 🆕 Thêm mới: cập nhật toàn bộ bill
export const updateOrder = (id, updatedOrder) =>
  axios.put(`${API_URL}/orders/${id}`, updatedOrder);
export const deleteMenuItem = (id) =>
  axios.delete(`${API_URL}/menu/${id}`);

export const createMenuItem = (item) =>
  axios.post(`${API_URL}/menu`, item);
