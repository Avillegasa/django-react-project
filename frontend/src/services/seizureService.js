// seizureService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/seizure';

export const fetchOperations = async () => {
    try {
        const response = await axios.get(`${API_URL}/operations`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener operaciones:', error);
        throw error;
    }
};
