# API REST (PHARMLY)

Base URL (desarrollo): `http://localhost:8080`

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/health` | Estado del servicio |
| GET | `/api/home/summary` | Resumen para inicio/panel |
| GET | `/api/medications` | Lista de medicamentos |
| GET | `/api/medications/search?q=` | Búsqueda por nombre o genérico |
| GET | `/api/medications/{id}` | Detalle por id |
| POST | `/api/medications` | Cuerpo JSON (campos del formulario; `name` obligatorio) |
| PUT | `/api/medications/{id}` | Actualizar |
| DELETE | `/api/medications/{id}` | Eliminar (204) |
| GET | `/api/quiz/questions` | Preguntas del repaso con opciones |
| POST | `/api/quiz/answer` | Cuerpo JSON: `questionId`, `optionId` |
| POST | `/api/advice` | Cuerpo JSON: `topic` (texto del usuario) |

CORS: `WebConfig` permite orígenes locales (8080, 5173) bajo `/api/**`.
