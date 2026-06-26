import api from './api'


export async function registerUser(formData) {
    const resp=await api.post('/api/user/register',formData);
    return resp.data;
}

export async function loginUser(formData){
    const resp=await api.post('/api/user/login',formData);
    return resp.data;
}

export async function logoutUser() {
    const resp=await api.post('/api/user/logout')
    return resp.data;
}

export async function getUserProfile() {
    const resp=await api.get('/api/user/get-me')
    return resp.data;
}