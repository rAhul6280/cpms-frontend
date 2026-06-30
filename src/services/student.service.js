import api from './api';

export const updateProfile = async (profileData) => {
    try {
        const response = await api.patch('/api/student/update-profile', profileData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const updateResume = async (resumeFile) => {
    try {
        const formData = new FormData();
        formData.append('resume', resumeFile);
        
        const response = await api.patch('/api/student/resume', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const getStudentSelections = async () => {
    try {
        const response = await api.get('/api/student/selections');
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};
