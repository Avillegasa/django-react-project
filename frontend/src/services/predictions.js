export const fetchCategoryData = async (category, period) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/comisos/trends/category/?category=${category}&period=${period}`);
        if (!response.ok) {
            throw new Error("Error al obtener los datos de la categoría");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error en fetchCategoryData:", error.message);
        throw error;
    }
};

export const fetchPrediction = async () => {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/comisos/trends/predict/");
        if (!response.ok) {
            throw new Error("Error al obtener la predicción");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error en fetchPrediction:", error.message);
        throw error;
    }
};