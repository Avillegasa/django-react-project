// predictions.js

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

// Nueva función para categorías
export const fetchCategoryData = async (category) => {
  try {
      const url = `http://127.0.0.1:8000/api/comisos/trends/category/?category=${encodeURIComponent(category)}`;
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error("Error al obtener datos de la categoría");
      }
      const data = await response.json();
      return data;
  } catch (error) {
      console.error("Error en fetchCategoryData:", error.message);
      throw error;
  }
};
