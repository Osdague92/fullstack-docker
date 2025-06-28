// Importa el framework Express para construir la aplicación web.
const express = require('express');
// Importa bodyParser para parsear los cuerpos de las solicitudes HTTP (ej. JSON, URL-encoded).
// Aunque Express 4.16.0+ ya incluye su propio parser JSON, bodyParser es aún común.
const bodyParser = require('body-parser');
// Importa el módulo 'cors' para manejar las políticas de seguridad de Origen Cruzado (CORS).
// Esto es crucial para permitir que el frontend (en un puerto diferente) acceda a la API.
const cors = require('cors'); 
// Importa las funciones de conexión y obtención de la DB desde nuestro archivo db.js.
const db = require('./db');
// Importa el enrutador principal que agrupa todas nuestras rutas de la API.
// Este archivo 'routes/index.js' (que no has mostrado pero implicas con 'routes')
// debería importar y combinar las rutas de 'routes/items.js'.
const routes = require('./routes'); 

// Crea una instancia de la aplicación Express.
const app = express();
// Define el puerto en el que el servidor escuchará.
// Prioriza el puerto definido en las variables de entorno (ej. para despliegue) o usa 5000 por defecto.
// La prueba técnica menciona el puerto 5000 para el backend en Docker Compose.
const PORT = process.env.PORT || 5000; 

// Middleware para habilitar CORS.
// Permite que el frontend (ej. en localhost:3000) haga solicitudes al backend (localhost:5000).
app.use(cors()); 
// Middleware para parsear el cuerpo de las solicitudes entrantes en formato JSON.
// Los datos JSON enviados por el frontend estarán disponibles en req.body.
app.use(bodyParser.json()); 
// Middleware para parsear datos codificados en URL (comúnmente de formularios HTML).
// 'extended: true' permite parsear objetos y arrays anidados.
app.use(bodyParser.urlencoded({ extended: true })); 

// Monta el enrutador principal de la API.
// Todas las rutas definidas en 'routes' estarán precedidas por '/api'.
// Por ejemplo, una ruta '/items' en 'routes' se accederá como '/api/items'.
app.use('/api', routes); 

// Conecta a la base de datos y luego inicia el servidor Express.
// Esta es una promesa, por lo que usamos .then() para asegurarnos de que la DB esté conectada
// antes de que el servidor empiece a aceptar solicitudes.
db.connectDB() 
  .then(() => {
    // Si la conexión a la base de datos es exitosa, se imprime un mensaje.
    console.log('Conectado a la base de datos');

    // Inicia el servidor Express en el puerto especificado.
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`); 
    });
  })
  .catch(err => {
    // Si la conexión a la base de datos falla, se imprime el error.
    console.error('Error de conexión a la base de datos:', err); 
    // Termina el proceso de la aplicación con un código de error,
    // ya que la aplicación no puede funcionar sin la DB.
    process.exit(1);
  });
