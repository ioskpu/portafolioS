# 🚀 Migración a MongoDB + Cloudinary para el Portfolio

## OBJETIVO
Reemplazar el sistema actual (GitHub API + JSON estático) por una base de datos MongoDB real y un servicio de almacenamiento de imágenes Cloudinary, con una API REST completa.

## ARQUITECTURA PROPUESTA
1. **Frontend (Vite/React)**: Se comunica con nuestra API
2. **Backend API (Node.js/Express)**: Conectado a MongoDB
3. **Base de datos**: MongoDB Atlas (gratis 512MB)
4. **Almacenamiento**: Cloudinary (gratis 25GB/mes)
5. **Autenticación**: JWT para dashboard admin
6. **Hosting**: Vercel para frontend, Render/Railway para backend (gratis)

## PASO 1: Configurar servicios gratuitos

### 1.1 MongoDB Atlas
- Ve a https://www.mongodb.com/atlas
- Crea cuenta gratuita
- Crea un cluster gratuito (Shared)
- Crea usuario de base de datos y obtén connection string
- Whitelist IP 0.0.0.0/0 (para desarrollo)

### 1.2 Cloudinary
- Ve a https://cloudinary.com
- Crea cuenta gratuita
- Obtén: `cloud_name`, `api_key`, `api_secret`
- Configura upload preset (unsigned opcional)

### 1.3 Backend Hosting (Render/Railway)
- **Render.com**: 750 horas/mes gratis
- **Railway.app**: $5 crédito inicial, luego pausable

## PASO 2: Crear estructura del proyecto
portfolio-backend/
├── src/
│ ├── models/
│ │ └── Project.js
│ ├── routes/
│ │ ├── projects.js
│ │ ├── upload.js
│ │ └── auth.js
│ ├── middleware/
│ │ └── auth.js
│ ├── config/
│ │ └── database.js
│ └── app.js
├── .env
├── package.json
└── vercel.json (si usas Vercel para API)

portfolio-frontend/ (tu proyecto actual)
└── Actualizar servicios para usar nueva API