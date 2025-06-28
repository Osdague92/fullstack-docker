// Importa el módulo Express para crear el enrutador.
const express = require('express');
// Crea una nueva instancia de Router de Express.
// Este router manejará todas las rutas específicas de ítems.
const router = express.Router();
// Importa la función getDB desde el módulo de conexión a la base de datos (db.js).
// Esta función nos dará acceso a la instancia de la base de datos conectada.
const { getDB } = require('../db');
// Importa ObjectId de mongodb. Es crucial para trabajar con los IDs de documentos de MongoDB,
// ya que son objetos especiales, no simplemente cadenas.
const { ObjectId } = require('mongodb');

// =======================================================
// Rutas CRUD para 'items'
// =======================================================

/**
 * GET /items
 * Obtiene todos los ítems de la colección 'items'.
 * Ruta completa: /api/items
 */
router.get('/', async (req, res) => {
  try {
    // Obtiene la instancia de la base de datos.
    const db = getDB();
    // Accede a la colección 'items' y busca todos los documentos.
    // .find(): Inicia una operación de búsqueda (sin filtros, obtiene todo).
    // .toArray(): Convierte los resultados del cursor en un array de documentos.
    const items = await db.collection('items').find().toArray();
    // Envía la lista de ítems como respuesta JSON con un estado 200 (OK).
    res.json(items);
  } catch (error) {
    // Si ocurre un error, lo registra en la consola para depuración.
    console.error('Error al obtener ítems:', error);
    // Envía una respuesta de error con estado 500 (Error Interno del Servidor) y un mensaje JSON.
    res.status(500).json({ error: 'Fallo al obtener ítems' });
  }
});

/**
 * POST /items
 * Crea un nuevo ítem en la colección 'items'.
 * Ruta completa: /api/items
 */
router.post('/', async (req, res) => {
  try {
    // Desestructura el 'name' del cuerpo de la solicitud.
    // La prueba técnica pide 'name' y 'description'. Asegurémonos de incluir ambos.
    const { name, description } = req.body;

    // Validación básica: asegura que el 'name' y 'description' estén presentes.
    if (!name || !description) {
      return res.status(400).json({ error: 'Nombre y descripción son requeridos' });
    }

    // Obtiene la instancia de la base de datos.
    const db = getDB();
    // Inserta el nuevo documento en la colección 'items'.
    // `insertOne` devuelve un objeto con `insertedId`.
    const result = await db.collection('items').insertOne({ name, description });

    // Envía una respuesta con estado 201 (Creado) y el nuevo ítem insertado.
    // La propiedad 'insertedId' contiene el ID único asignado por MongoDB.
    res.status(201).json({ _id: result.insertedId, name, description });
  } catch (error) {
    // Si ocurre un error, lo registra en la consola.
    console.error('Error al crear ítem:', error);
    // Envía una respuesta de error con estado 500.
    res.status(500).json({ error: 'Fallo al crear ítem' });
  }
});

/**
 * GET /items/:id
 * Obtiene un ítem específico por su ID.
 * Ruta completa: /api/items/:id
 */
router.get('/:id', async (req, res) => {
    try {
        // Obtiene el ID del ítem desde los parámetros de la URL.
        const { id } = req.params;
        // Obtiene la instancia de la base de datos.
        const db = getDB();
        // Busca un documento en la colección 'items' donde el _id coincida con el ID proporcionado.
        // Es fundamental convertir la cadena de ID a un objeto ObjectId de MongoDB.
        const item = await db.collection('items').findOne({ _id: new ObjectId(id) });

        // Si no se encuentra ningún ítem con ese ID, devuelve un error 404 (No Encontrado).
        if (!item) {
            return res.status(404).json({ error: 'Ítem no encontrado' });
        }
        // Si se encuentra el ítem, lo envía como respuesta JSON.
        res.json(item);
    } catch (error) {
        // Si ocurre un error (ej. ID inválido, error de DB), lo registra.
        console.error('Error al obtener ítem por ID:', error);
        // Envía una respuesta de error 500.
        res.status(500).json({ error: 'Fallo al obtener ítem' });
    }
});


/**
 * PUT /items/:id
 * Actualiza un ítem existente en la colección 'items' por su ID.
 * Ruta completa: /api/items/:id
 */
router.put('/:id', async (req, res) => {
  try {
    // Desestructura el 'name' y 'description' del cuerpo de la solicitud (datos a actualizar).
    const { name, description } = req.body;
    // Obtiene el ID del ítem a actualizar desde los parámetros de la URL.
    const { id } = req.params;

    // Validación básica: asegura que el 'name' y 'description' estén presentes.
    if (!name || !description) {
        return res.status(400).json({ error: 'Nombre y descripción son requeridos para actualizar' });
    }

    // Obtiene la instancia de la base de datos.
    const db = getDB();
    // Actualiza un documento en la colección 'items'.
    // El primer argumento es el filtro para encontrar el documento (por _id).
    // El segundo argumento es el operador '$set' que especifica los campos a actualizar y sus nuevos valores.
    const result = await db.collection('items').updateOne(
      { _id: new ObjectId(id) }, // Convertimos el ID de cadena a ObjectId
      { $set: { name, description } } // Actualiza los campos 'name' y 'description'
    );

    // Si `modifiedCount` es 0, significa que no se encontró un ítem con ese ID o no hubo cambios.
    if (result.matchedCount === 0) { // Si no encontró un documento con el ID
        return res.status(404).json({ error: 'Ítem no encontrado' });
    }
    if (result.modifiedCount === 0) { // Si lo encontró pero no se modificó (ej. datos idénticos)
        return res.status(200).json({ message: 'Ítem encontrado pero sin cambios aplicados' });
    }

    // Si la actualización fue exitosa, envía un mensaje de confirmación.
    res.json({ message: 'Ítem actualizado' });
  } catch (error) {
    // Si ocurre un error, lo registra.
    console.error('Error al actualizar ítem:', error);
    // Envía una respuesta de error 500.
    res.status(500).json({ error: 'Fallo al actualizar ítem' });
  }
});

/**
 * DELETE /items/:id
 * Elimina un ítem de la colección 'items' por su ID.
 * Ruta completa: /api/items/:id
 */
router.delete('/:id', async (req, res) => {
  try {
    // Obtiene el ID del ítem a eliminar de los parámetros de la URL.
    const { id } = req.params;

    // Obtiene la instancia de la base de datos.
    const db = getDB();
    // Elimina un documento de la colección 'items' por su _id.
    // Es fundamental convertir la cadena de ID a un objeto ObjectId de MongoDB.
    const result = await db.collection('items').deleteOne({ _id: new ObjectId(id) });

    // Si `deletedCount` es 0, significa que no se encontró un ítem con ese ID para eliminar.
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Ítem no encontrado' });
    }
    // Si la eliminación fue exitosa, envía un mensaje de confirmación.
    res.json({ message: 'Ítem eliminado' });
  } catch (error) {
    // Si ocurre un error, lo registra.
    console.error('Error al eliminar ítem:', error);
    // Envía una respuesta de error 500.
    res.status(500).json({ error: 'Fallo al eliminar ítem' });
  }
});

// Exporta el enrutador para que pueda ser usado en server.js (o en routes/index.js).
module.exports = router;
