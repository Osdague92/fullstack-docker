
// Importa la clase MongoClient del driver oficial de MongoDB.
// Se usa para crear una instancia de cliente para conectarse a la base de datos.
const { MongoClient, ServerApiVersion } = require('mongodb'); 
// Importa el módulo dotenv para cargar variables de entorno desde un archivo .env.
// Esto es útil para mantener la configuración sensible (como URIs de DB) fuera del código fuente.
const dotenv = require('dotenv');

// Carga las variables de entorno definidas en el archivo .env al objeto process.env.
dotenv.config();

// Define la URI de conexión a MongoDB.
// Primero intenta usar la variable de entorno MONGO_URI.
// Si MONGO_URI no está definida, usa un valor por defecto:
// "mongodb://db:27017/my_app_db"
//   - "mongodb://" es el protocolo.
//   - "db" es el nombre del servicio de MongoDB definido en docker-compose.yml.
//     Dentro de la red de Docker Compose, los servicios pueden comunicarse por su nombre.
//   - "27017" es el puerto por defecto de MongoDB.
//   - "my_app_db" es el nombre de la base de datos a la que la aplicación se conectará.
const uri = process.env.MONGO_URI || "mongodb://db:27017/my_app_db";

// Crea una nueva instancia de MongoClient con la URI de conexión.
// Se añade la opción serverApi para compatibilidad con versiones recientes de MongoDB Atlas,
// aunque para una instalación local de Docker Compose, a menudo no es estrictamente necesario,
// es una buena práctica para futuras expansiones o deployments.
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1, // Especifica la versión de la API del servidor MongoDB.
    strict: true,                  // Aplica un modo estricto para las consultas.
    deprecationErrors: true,       // Muestra errores para características deprecadas.
  }
});

// Declara una variable 'db' para almacenar la instancia de la base de datos una vez conectada.
// Se usa 'let' porque su valor cambiará después de una conexión exitosa.
let db;

/**
 * Función asíncrona para establecer la conexión a la base de datos MongoDB.
 * @returns {Promise<void>} Una promesa que se resuelve cuando la conexión es exitosa.
 */
const connectDB = async () => {
  try {
    // Intenta conectar el cliente MongoDB al servidor.
    await client.connect();
    // Una vez conectado, asigna la base de datos 'my_app_db' a la variable 'db'.
    // Es importante especificar el nombre de la base de datos aquí,
    // ya que `client.db()` sin argumentos podría tomar el nombre de la URI,
  
    db = client.db("my_app_db"); 
    console.log('MongoDB conectado usando el driver nativo');
  } catch (error) {
    // Si ocurre un error durante la conexión, lo registra en la consola.
    console.error('Error al conectar a MongoDB:', error.message);
    // Termina el proceso de la aplicación con un código de error (1),
    // indicando que la aplicación no puede funcionar sin conexión a la DB.
    process.exit(1);
  }
};

/**
 * Función para obtener la instancia de la base de datos conectada.
 * Permite que otros módulos accedan a la instancia de la DB sin tener que reconectar.
 * @returns {Db} La instancia de la base de datos MongoDB.
 * @throws {Error} Si la base de datos no ha sido inicializada (es decir, connectDB() no se ha llamado o falló).
 */
const getDB = () => {
  // Verifica si la instancia de la base de datos ha sido asignada.
  if (!db) {
    // Si no está asignada, lanza un error para indicar que la conexión no se ha establecido.
    throw new Error('Base de datos no inicializada. Llama a connectDB() primero.');
  }
  // Retorna la instancia de la base de datos.
  return db;
};

// Exporta las funciones connectDB y getDB para que puedan ser usadas por otros módulos.
module.exports = {
  connectDB,
  getDB,
};
