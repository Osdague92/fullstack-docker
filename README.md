# 🚀 Proyecto Fullstack: Gestión de Ítems

Aplicación web Fullstack construida como parte de una prueba técnica, cuyo objetivo es demostrar competencias en el desarrollo de aplicaciones modernas usando React, Node.js y MongoDB, orquestadas con Docker Compose.

Esta aplicación permite realizar operaciones **CRUD** sobre ítems, y está diseñada bajo una arquitectura de **microservicios** desplegada en contenedores, facilitando el desarrollo, la depuración y la escalabilidad.

---

## ✨ Descripción Breve

- **Frontend:** React + Material UI para una UI moderna y responsiva.
- **Backend:** Node.js + Express para la API RESTful.
- **Base de Datos:** MongoDB.
- **Contenerización:** Docker + Docker Compose.
- **Entorno de desarrollo:** WSL2 + Ubuntu + VS Code.

---

## 🛠️ Tecnologías Utilizadas

### 🔹 Frontend
- **React**: Biblioteca JavaScript para construir interfaces de usuario.
- **Material UI**: Componentes visuales que siguen el Material Design.
- **Formik**: Gestión de estados en formularios.
- **Yup**: Validación de esquemas de formularios.
- **Axios**: Cliente HTTP para consumo de la API.
- **Tailwind CSS**: Inicialmente probado, luego sustituido por Material UI.

### 🔸 Backend
- **Node.js**: Entorno de ejecución de JavaScript del lado del servidor.
- **Express.js**: Framework web minimalista para construir APIs REST.
- **MongoDB**: Base de datos NoSQL orientada a documentos.
- **dotenv**: Gestión de variables de entorno.
- **cors**: Middleware para habilitar CORS.
- **body-parser**: Middleware para procesar cuerpos de peticiones HTTP.

### ⚙️ Infraestructura
- **Docker**: Plataforma de contenedores.
- **Docker Compose**: Orquestación multi-servicio.
- **WSL2**: Entorno Linux sobre Windows.
- **VS Code**: Editor con integración WSL para desarrollo fluido.

---

## 📁 Estructura del Proyecto

```
my-fullstack-app/
├── backend/
│   ├── routes/
│   │   ├── index.js
│   │   └── items.js
│   ├── db.js
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js
│   └── .env.example
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ItemForm.js
│   │   │   ├── ItemList.js
│   │   │   └── Navbar.js
│   │   ├── services/
│   │   │   └── itemService.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── Dockerfile
│   ├── package.json
│   └── package-lock.json
└── docker-compose.yml
```

---

## 🧰 Instalación y Configuración Local

### ✅ Requisitos Previos
- Windows 10/11 con **WSL2**.
- **Ubuntu** instalado vía Microsoft Store.
- **Docker Desktop** configurado para WSL2.
- **Node.js** (v18–22) y **npm/nvm** dentro de WSL.
- **Visual Studio Code** con extensión _Remote - WSL_.

### 📦 Pasos de Instalación

1. Clona el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO> my-fullstack-app
cd my-fullstack-app
```

2. Abre tu terminal de Ubuntu (WSL):

```bash
wsl -d Ubuntu
cd "/mnt/c/Users/TuUsuario/Ruta/A/Tu/Proyecto/my-fullstack-app/"
code .
```

3. Instala dependencias:

```bash
# Backend
cd backend
npm install
cd ..

# Frontend
cd frontend
npm install
cd ..
```

4. Configura variables de entorno:

```bash
cd backend
cp .env.example .env
```

Edita `.env` y asegúrate de tener:

```
MONGO_URI=mongodb://db:27017/my_app_db
PORT=5000
```

---

## 🐳 Uso con Docker Compose

Desde la raíz del proyecto:

```bash
# Primera vez (o si modificas Dockerfile/package.json)
docker-compose up --build

# Levantar normalmente
docker-compose up

# En segundo plano
docker-compose up -d

# Detener y eliminar contenedores
docker-compose down

# Detener y eliminar también volúmenes
docker-compose down -v
```

---

## 🌐 Acceder a la Aplicación

Una vez iniciado el entorno con Docker:

🔗 **http://localhost:3000**

---

## 🔗 Endpoints de la API (Backend)

📍 Base: `http://localhost:5000/api/items`

| Método | Endpoint         | Descripción                        | Body de Ejemplo                         | Respuesta de Ejemplo                      |
|--------|------------------|------------------------------------|------------------------------------------|-------------------------------------------|
| GET    | `/api/items`     | Lista todos los ítems              | N/A                                      | `[{ "_id": "...", "name": "...", "description": "..." }]` |
| GET    | `/api/items/:id` | Obtener ítem por ID                | N/A                                      | `{ "_id": "...", "name": "...", "description": "..." }`   |
| POST   | `/api/items`     | Crear un nuevo ítem                | `{ "name": "Laptop", "description": "..." }` | `{ "_id": "...", "name": "...", "description": "..." }` |
| PUT    | `/api/items/:id` | Actualizar ítem por ID             | `{ "name": "Nuevo", "description": "..." }` | `{ "message": "Ítem actualizado" }`      |
| DELETE | `/api/items/:id` | Eliminar ítem por ID               | N/A                                      | `{ "message": "Ítem eliminado" }`        |

---

## 💡 Comandos Útiles

### Docker CLI

```bash
docker ps
docker images
docker logs <nombre|id>
docker logs -f <nombre|id>
docker exec -it <nombre|id> /bin/sh
docker image prune -a
```

### Desarrollo sin Docker

```bash
# Backend
cd backend
npm install
npm start

# Frontend
cd frontend
npm install
npm start
```

---

## 📄 Licencia

Este proyecto está bajo la [Licencia MIT](./LICENSE).

---

## 👤 Autor y Créditos

**Autor/a:** [Tu Nombre Completo Aquí]  
📧 Contacto: [Tu Correo / GitHub / LinkedIn]

### 🙌 Agradecimientos
- Microsoft (WSL2 + VS Code)
- Docker & Docker Compose
- Comunidades de React, Node.js y MongoDB
- Bibliotecas: Material UI, Formik, Yup, Axios

---

> ¿Te fue útil este proyecto? ¡Dale una estrella ⭐ en GitHub!