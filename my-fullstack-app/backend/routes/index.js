
// Importa Express y crea un nuevo enrutador.
const express = require('express');
const router = express.Router();

// Importa las rutas de ítems desde './items.js'.
const itemsRouter = require('./items');

// Monta las rutas de ítems bajo el path '/items'.
// Esto significa que todas las rutas en items.js (ej. /) se accederán como /items,
// y como server.js ya usa /api, la ruta completa será /api/items.
router.use('/items', itemsRouter);

// Puedes añadir otras rutas aquí si tuvieras más funcionalidades (ej. /users, /auth).

// Exporta el enrutador principal para que server.js pueda usarlo.
module.exports = router;