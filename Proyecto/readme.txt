Integrantes del proyecto:
- Martel Santos Alexis Nil
- Oliva Comeca William Manuel
- Ramirez Tarazona Roy
- Sihue Saavedra Julio Cesar
- Torres Álvarez Paúl Cesar
- Vega Hidalgo Lincoln Jhoel

---
Estructura del repositorio (PHARMLY)

  Proyecto/
  ├── backend-springboot/     ← API REST + Spring Boot 3.5 (Java 17+), JAR; sirve la SPA compilada
  ├── frontend-react/       ← Interfaz React (Vite + JSX), estilos APF (prototipo)
  ├── docs/                 ← Documentación (API, diagramas, requisitos)
  ├── database/             ← Scripts SQL de referencia / copias
  └── readme.txt            ← Este archivo

Ubicación del backend: Proyecto/backend-springboot/
Cliente React: Proyecto/frontend-react/
(artifact Maven: pharmly-backend, paquete Java: com.pharmly)

--- Interfaz web (React) ---
Tras compilar el frontend, la app está en el mismo puerto que el backend:

  http://localhost:8080/       (redirige a /inicio en el cliente)
  http://localhost:8080/inicio
  http://localhost:8080/panel
  http://localhost:8080/consulta
  http://localhost:8080/medicamentos
  http://localhost:8080/aprendizaje
  (ruta anterior /repaso redirige a /aprendizaje)
  http://localhost:8080/consejos

API: http://localhost:8080/api/estado
H2: http://localhost:8080/h2-console  (jdbc:h2:mem:pharmly , usuario sa, sin contraseña)

--- Compilar frontend (Node.js 18+ y npm) ---
PowerShell, desde frontend-react:

  npm install
  npm run build:backend

Eso genera los estáticos en backend-springboot/src/main/resources/static/ (incluye index.html y assets).
Para despliegue en Vercel usa: npm run build (genera carpeta dist/).

Desarrollo con recarga en caliente: en una terminal el backend (puerto 8080) y en otra:

  cd frontend-react
  npm run dev

Abre http://localhost:5173 ; Vite hace proxy de /api y /h2-console hacia 8080.

--- Compilar y ejecutar backend (Maven Wrapper) ---
PowerShell, desde backend-springboot:

  .\mvnw.cmd clean install
  .\mvnw.cmd spring-boot:run

O: .\build.ps1  y  .\run.ps1

La primera vez, mvnw descarga Maven 3.9.9 (necesitas Internet).
Requisito: JDK 17+ (java -version).

Cursor/VS Code: .vscode/settings.json apunta a mvnw.cmd del backend.

Datos (canónicos): backend-springboot/src/main/resources/schema.sql y data.sql

--- Despliegue en la nube (Vercel + Render) ---

1) Backend en Render (gratis):
   - Conecta el repo en https://render.com
   - Usa el archivo render.yaml de la raíz del repositorio
   - Variables de entorno obligatorias:
       GROQ_API_KEY = tu clave de Groq (chatbot)
   - Opcional: CORS_ALLOWED_ORIGINS = https://tu-app.vercel.app
   - Copia la URL del servicio (ej. https://pharmly-backend.onrender.com)

2) Frontend en Vercel:
   - Importa el repo en https://vercel.com
   - Root Directory: Proyecto/frontend-react
   - Build Command: npm run build
   - Output Directory: dist
   - Variable de entorno obligatoria:
       BACKEND_URL = URL del backend en Render (sin barra final)
   - No hace falta VITE_API_BASE_URL: Vercel reenvía /api al backend

3) Probar:
   - Abre tu URL de Vercel → login
   - Chatbot, medicamentos y aprendizaje usan el backend vía proxy /api

Nota: Render free puede tardar ~1 min en despertar tras inactividad.
La base H2 es en memoria: los datos se reinician al reiniciar el backend.
