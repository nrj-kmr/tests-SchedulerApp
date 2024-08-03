import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8000/api/'
});

export const fetchUsers = () => api.get('/admin/getUsers');
export const fetchUserByEmail = (email) => api.get(`/admin/getUser/${email}`);
export const fetchTests = () => api.get('/admin/getTests');
export const fetchDepartments = () => api.get('/admin/getDepartments');