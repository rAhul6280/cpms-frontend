import axios from 'axios'
const api=axios.create({
    baseURL:'http://localhost:5000',
    withCredentials:true,
    headers:{
        "Content-Type":'application/json'
    }
})

export async function registerUser(formData) {
    const resp=await api.post('/api/user/register',formData);
    return resp.data;
}

export async function loginUser(formData){
    const resp=await api.post('/api/user/login',formData);
    return resp.data;
}

export async function logoutUser(params) {
    const resp=await api.post('/api/user/logout')
    return resp.data;
}