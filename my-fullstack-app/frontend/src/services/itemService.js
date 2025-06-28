// Importa la biblioteca Axios para hacer peticiones HTTP.
import axios from 'axios';

// Define la URL base de tu API de backend.
const API_URL = 'http://localhost:5000/api/items';

// Función para obtener todos los ítems del backend.
const getItems = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener ítems:", error);
    throw error;
  }
};

// Función para crear un nuevo ítem en el backend.
const createItem = async (item) => {
  try {
    const response = await axios.post(API_URL, item);
    return response.data;
  } catch (error) {
    console.error("Error al crear ítem:", error);
    throw error;
  }
};

// Función para actualizar un ítem existente en el backend.
const updateItem = async (id, item) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, item);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar ítem:", error);
    throw error;
  }
};

// Función para eliminar un ítem del backend.
const deleteItem = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar ítem:", error);
    throw error;
  }
};

// Exporta todas las funciones para que puedan ser importadas y utilizadas por los componentes React.
export { getItems, createItem, updateItem, deleteItem };