import api from './api';

export const getStudents = async (filters) => {
    try {
        if (filters && Object.keys(filters).length > 0) {
            const queryParams = new URLSearchParams(filters).toString();
            const response = await api.get(`/api/recruiter/students/filter?${queryParams}`);
            return response.data;
        } else {
            const response = await api.get('/api/recruiter/students');
            return response.data;
        }
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const getStudentDetails = async (studentId) => {
    try {
        const response = await api.get(`/api/recruiter/students/${studentId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const hireStudent = async (data) => {
    try {
        const response = await api.post('/api/recruiter/hire', data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const getMySelections = async (status = '') => {
    try {
        if (status && status !== 'all') {
            const response = await api.get(`/api/recruiter/selections/filter?status=${status}`);
            return response.data;
        } else {
            const response = await api.get('/api/recruiter/selections');
            return response.data;
        }
    } catch (error) {
        throw error.response?.data || error;
    }
};
