import axios from 'axios'

export const serverURL = import.meta.env.VITE_SERVER_URL;

const api = axios.create({
    baseURL: `${serverURL}/api`,
});

export const fetchUsers = () => api.get('/admin/getUsers');
export const fetchUserByEmail = (email) => api.get(`/admin/getUser/${email}`);
export const addUser = (newUser) => api.post('/admin/createUser', newUser);
export const updateUser = (id, updatedUser) => api.put(`/admin/editUser/${id}`, updatedUser);
export const deleteUser = (id) => api.delete(`/admin/deleteUser/${id}`);

export const fetchTests = () => api.get('/admin/getTests');
export const addTest = (newTest) => api.post('/admin/createTest', newTest);
export const updateTest = (id, updatedTest) => api.put(`/admin/editTest/${id}`, updatedTest);
export const deleteTest = (id) => api.delete(`/admin/deleteTest/${id}`);

export const fetchDepartments = () => api.get('/admin/getDepartments');
export const addDepartment = (newDepartment) => api.post('/admin/createDepartment', newDepartment);
export const updateDepartment = (id, updatedDepartment) => api.put(`/admin/editDepartment/${id}`, updatedDepartment);
export const deleteDepartment = (id) => api.delete(`/admin/deleteDepartment/${id}`);