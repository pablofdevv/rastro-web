# Rastro Web

Aplicación web frontend de **Rastro**, la plataforma de compraventa de segunda mano. Desarrollada con React, Vite, TypeScript, React Router y Redux Toolkit Query (RTK Query).

## Requisitos previos

- Node.js >= 20
- npm >= 10

## Instalación

```bash
npm install
```

## Ejecución en desarrollo

### 1. Arrancar la API simulada (json-server en puerto 3001)

```bash
npm run api
```

### 2. Arrancar la aplicación web (puerto 5173)

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:5173](http://localhost:5173).

## Scripts disponibles

- `npm run dev`: Inicia el servidor de desarrollo Vite.
- `npm run build`: Compila el proyecto con comprobación de tipos TypeScript y empaqueta para producción.
- `npm run lint`: Ejecuta el linter ESLint.
- `npm run api`: Ejecuta la API simulada con `json-server` en el puerto 3001.

## Despliegue en Netlify

El proyecto incluye la configuración para Single Page Application en `public/_redirects` (`/* /index.html 200`).
Variable de entorno en Netlify:
- `VITE_API_URL`: URL del backend (ej. `https://api-rastro-tunombre.onrender.com/api`).
