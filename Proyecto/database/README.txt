# Base de datos (referencia PHARMLY)

El esquema **activo** que usa la aplicación al arrancar está en:

`Proyecto/backend-springboot/src/main/resources/schema.sql`  
`Proyecto/backend-springboot/src/main/resources/data.sql`

## Nombres en español

| Tabla | Uso |
|--------|-----|
| `medicamento` | Catálogo (nombre, categoría, presentación, precio, textos clínicos). |
| `pregunta_aprendizaje` | Preguntas del módulo Aprendizaje. |
| `opcion_aprendizaje` | Opciones de cada pregunta (`pregunta_id` → `pregunta_aprendizaje`). |

Columnas principales de `medicamento`: `nombre`, `nombre_generico`, `descripcion`, `uso_comun`, `precauciones`, `orientacion_dosis`, `efectos_secundarios`, `categoria`, `presentacion`, `precio`.

Los valores de `categoria` coinciden con el filtro del catálogo en React: `analgesicos`, `antibioticos`, `antiinflamatorios`, `cardiovasculares`, `neurologicos`, `dermatologicos`.

Esta carpeta puede guardar copias o scripts adicionales; el backend H2 en memoria carga solo los `classpath:` indicados en `application.properties`.
