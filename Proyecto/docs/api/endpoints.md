# API REST (PHARMLY)

Base URL (desarrollo): `http://localhost:8080`

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/estado` | Estado del servicio |
| GET | `/api/inicio/resumen` | Resumen para inicio/panel |
| GET | `/api/medicamentos` | Lista de medicamentos (incluye `category`, `presentation`, `price` si existen) |
| GET | `/api/medicamentos/buscar?q=` | Búsqueda por nombre o genérico |
| GET | `/api/medicamentos/{id}` | Detalle por id |
| POST | `/api/medicamentos` | Cuerpo JSON (campos del formulario; `name` obligatorio) |
| PUT | `/api/medicamentos/{id}` | Actualizar |
| DELETE | `/api/medicamentos/{id}` | Eliminar (204) |
| GET | `/api/aprendizaje/preguntas` | Preguntas del módulo Aprendizaje con opciones |
| POST | `/api/aprendizaje/respuesta` | Cuerpo JSON: `questionId`, `optionId` |
| POST | `/api/consejos` | Cuerpo JSON: `topic` (texto del usuario) |

CORS: `ConfiguracionWeb` permite orígenes locales (8080, 5173) bajo `/api/**`.
