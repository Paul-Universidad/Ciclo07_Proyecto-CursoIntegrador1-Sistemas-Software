PHARMLY — cliente React (Vite), estructura tipo PHARMLY.

Desarrollo (API en 8080 + hot reload en 5173):
  npm install
  npm run dev
  En otra terminal: ..\backend-springboot\mvnw.cmd spring-boot:run
  Abre http://localhost:5173 (el proxy reenvía /api y /h2-console al backend).

Producción integrada en Spring (genera estáticos dentro del backend):
  npm install
  npm run build
  Los archivos quedan en ../backend-springboot/src/main/resources/static/

Requisitos: Node.js 18+ (npm incluido).
