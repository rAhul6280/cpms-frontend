import api from './api';

export const getAllSelections = async () => {
    try {
        const response = await api.get('/api/admin/selections');
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const getFilteredSelections = async (status) => {
    try {
        const response = await api.get(`/api/admin/selections/filter?status=${status}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const updateSelectionStatus = async (selectionId, status) => {
    try {
        const response = await api.patch(`/api/admin/update/${selectionId}`, { status });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};
