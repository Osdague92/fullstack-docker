
// Importa React y los hooks useState y useEffect para manejar el estado y los efectos secundarios.
import React, { useEffect, useState } from 'react';
// Importa las funciones de servicio para interactuar con la API del backend.
import { getItems, deleteItem } from '../services/itemService';

/**
 * Componente ItemList: Muestra una lista de ítems y permite eliminarlos o editarlos.
 * @param {Object} props - Las props pasadas al componente.
 * @param {function} props.onEdit - Función para notificar al padre qué ítem se va a editar.
 * @param {boolean} props.refreshTrigger - Un disparador para recargar la lista de ítems.
 */
function ItemList({ onEdit, refreshTrigger }) {
  // Estado para almacenar la lista de ítems.
  const [items, setItems] = useState([]);
  // Estado para indicar si la información está cargando.
  const [loading, setLoading] = useState(true);
  // Estado para almacenar mensajes de error.
  const [error, setError] = useState(null);

  // Función asíncrona para obtener los ítems del backend.
  const fetchItems = async () => {
    setLoading(true); // Inicia el estado de carga.
    setError(null);    // Limpia cualquier error previo.
    try {
      const data = await getItems(); // Llama a la función de servicio para obtener ítems.
      setItems(data); // Actualiza el estado con los ítems obtenidos.
    } catch (err) {
      setError("Error al cargar los ítems. Por favor, intente de nuevo."); // Establece un mensaje de error.
      console.error(err); // Muestra el error completo en la consola.
    } finally {
      setLoading(false); // Finaliza el estado de carga, independientemente del resultado.
    }
  };

  // useEffect se ejecuta después de cada render.
  // Con un array de dependencias [refreshTrigger], se ejecutará cuando el componente
  // se monte por primera vez y cada vez que 'refreshTrigger' cambie.
  useEffect(() => {
    fetchItems(); // Llama a la función para obtener los ítems.
  }, [refreshTrigger]); // Dependencia para recargar la lista cuando se crea o edita un ítem.

  /**
   * Manejador para eliminar un ítem.
   * @param {string} id - El ID del ítem a eliminar.
   */
  const handleDelete = async (id) => {
    // Muestra una ventana de confirmación antes de eliminar.
    // **NOTA:** En una aplicación real, se usaría un modal personalizado en lugar de `window.confirm`.
    if (window.confirm('¿Estás seguro de que quieres eliminar este ítem?')) {
      try {
        await deleteItem(id); // Llama a la función de servicio para eliminar el ítem.
        alert('Ítem eliminado con éxito!'); // Notificación de éxito.
        fetchItems(); // Recarga la lista para reflejar el cambio.
      } catch (err) {
        alert('Error al eliminar el ítem. Por favor, verifique la consola.'); // Notificación de error.
        console.error(err); // Muestra el error completo en la consola.
      }
    }
  };

  // Renderizado condicional basado en el estado de carga y error.
  if (loading) return <div className="text-center py-4">Cargando ítems...</div>;
  if (error) return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  if (items.length === 0) return <div className="text-center py-4 text-gray-500">No hay ítems para mostrar. ¡Crea uno nuevo!</div>;

  return (
    <div className="container mx-auto p-4 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Lista de Ítems</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Mapea sobre la lista de ítems y renderiza cada uno */}
        {items.map((item) => (
          <div key={item._id} className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-2">{item.name}</h3>
              <p className="text-gray-700 text-sm mb-4">{item.description}</p>
            </div>
            <div className="flex justify-end space-x-3 mt-4">
              {/* Botón Editar: Llama a la prop onEdit pasando el ítem completo */}
              <button
                onClick={() => onEdit(item)}
                className="px-4 py-2 bg-yellow-500 text-white font-medium rounded-md hover:bg-yellow-600 transition-colors duration-200 shadow-md"
              >
                Editar
              </button>
              {/* Botón Eliminar: Llama a handleDelete con el ID del ítem */}
              <button
                onClick={() => handleDelete(item._id)}
                className="px-4 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition-colors duration-200 shadow-md"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Exporta el componente para que pueda ser usado en otros archivos.
export default ItemList;
