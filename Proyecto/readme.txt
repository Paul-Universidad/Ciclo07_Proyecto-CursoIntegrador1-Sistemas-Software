Integrantes del proyecto:
- Martel Santos Alexis Nil
- Oliva Comeca William Manuel
- Ramirez Tarazona Roy
- Sihue Saavedra Julio Cesar
- Torres Álvarez Paúl Cesar
- Vega Hidalgo Lincoln Jhoel

---
MedFacil backend (Maven + Spring Boot 3.5, Java 17+, WAR + JSP)

Ubicación: Proyecto/medfacil-backend/

--- Compilar y ejecutar (recomendado: Maven Wrapper, no hace falta mvn en PATH) ---
PowerShell, desde medfacil-backend:

  .\mvnw.cmd clean install
  .\mvnw.cmd spring-boot:run

O:

  .\build.ps1
  .\run.ps1

La primera vez, mvnw descarga Maven 3.9.9 (necesitas Internet).
Requisito: JDK 17+ (java -version).

Maven global opcional: mvn clean install. En PowerShell comprueba PATH con: where.exe mvn

Cursor/VS Code: .vscode/settings.json apunta a mvnw.cmd del proyecto.

--- URLs (prototipo APF en JSP) ---
http://localhost:8080/inicio   (pantalla de bienvenida)
http://localhost:8080/panel    (dashboard de módulos)
http://localhost:8080/consulta (búsqueda y ficha: uso, dosis, precauciones, efectos)
http://localhost:8080/medicamentos  http://localhost:8080/repaso  http://localhost:8080/consejos
API: http://localhost:8080/api/health
SPA: http://localhost:8080/index.html
H2: http://localhost:8080/h2-console  (jdbc:h2:mem:medfacil , usuario sa, sin contraseña)

Datos: schema.sql y data.sql
