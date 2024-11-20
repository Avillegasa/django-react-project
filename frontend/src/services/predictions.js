export const fetchPrediction = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/comisos/api/trends/predict/");
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
  