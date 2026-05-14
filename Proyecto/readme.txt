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
  ├── backend-springboot/     ← API REST + Spring Boot 3.5 (Java 17+), WAR; sirve la SPA compilada
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
  http://localhost:8080/repaso
  http://localhost:8080/consejos

API: http://localhost:8080/api/health
H2: http://localhost:8080/h2-console  (jdbc:h2:mem:pharmly , usuario sa, sin contraseña)

--- Compilar frontend (Node.js 18+ y npm) ---
PowerShell, desde frontend-react:

  npm install
  npm run build

Eso genera los estáticos en backend-springboot/src/main/resources/static/ (incluye index.html y assets).

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
