import axios from "axios";

const API_URL = "http://localhost:4000/api/tasks";

const api = axios.create({
  baseURL: API_URL,
});

export const getTasks = () => api.get("/");
export const createTask = (task) => api.post("/", task);
export const updateTask = (id, task) => api.put(`/${id}`, task);
export const deleteTask = (id) => api.delete(`/${id}`);
export const toggleTask = (id) => api.patch(`/${id}/toggle`);

export default api;