# Backend_Tienda

Backend robusto para la gestión de una tienda de productos y servicios de seguridad, construido con Node.js, Express y MongoDB (Mongoose), siguiendo arquitectura limpia y buenas prácticas.

## Características principales
- **CRUD de productos** con paginación, filtros, validaciones estrictas y soporte para múltiples categorías, características y marca.
- **Comentarios en productos**: permite agregar, listar y obtener estadísticas de calificaciones (por estrellas), con paginación.
- **Registro de clics** en productos (por ejemplo, para seguimiento de WhatsApp), con estadísticas por producto.
- **Gestión de administradores**: roles de admin y superadmin, autenticación JWT, cambio de contraseña, activación/desactivación y control de expiración de licencia.
- **Swagger** para documentación automática de la API.
- **Seguridad**: helmet, CORS, rate limiting, validaciones, logging con winston y morgan.
- **Logging avanzado**: winston (logs en consola y archivo `logs/app.log`), morgan para logs HTTP.
- **Automatización**: desactivación automática de admins vencidos con node-cron.
- **Variables de entorno** y configuración centralizada.

## Estructura de carpetas
- `/models`: Esquemas de Mongoose (Producto, Admin, Comentario, Click)
- `/controllers`: Lógica de endpoints
- `/services`: Lógica de negocio
- `/repositories`: Acceso a datos
- `/middlewares`: Autenticación, roles, validaciones de estado
- `/routes/v1`: Rutas versionadas y centralizadas
- `/config`: Conexión a DB y logger (Winston)
- `/scripts`: Automatizaciones (desactivar admins vencidos)

## Endpoints principales
- `POST /api/v1/admin/login` — Login de administradores (JWT)
- `POST /api/v1/admin/register` — Registrar admin (solo admin activo o superadmin)
- `PATCH /api/v1/admin/:id/active` — Activar/desactivar admin (solo superadmin)
- `PATCH /api/v1/admin/:id/fecha-expiracion` — Cambiar fecha de expiración (solo superadmin)
- `DELETE /api/v1/admin/:id` — Eliminar admin (solo superadmin)
- `POST /api/v1/products` — Crear producto (admin activo)
- `PUT /api/v1/products/:id` — Editar producto (admin activo)
- `DELETE /api/v1/products/:id` — Eliminar producto (admin activo)
- `GET /api/v1/products` — Listar productos (paginación, filtros, público)
- `POST /api/v1/comments` — Agregar comentario a producto
- `GET /api/v1/comments/product/:productId` — Listar comentarios de producto (paginado)
- `GET /api/v1/comments/product/:productId/stats` — Estadísticas de calificaciones
- `POST /api/v1/clicks` — Registrar clic en producto
- `GET /api/v1/clicks/by-product` — Estadísticas de clics por producto

## Seguridad y control de acceso
- **JWT**: Todos los endpoints de administración requieren token.
- **Roles**: Solo el superadmin puede gestionar otros admins y licencias.
- **Estado activo**: Si un admin está deshabilitado o su licencia expiró, solo puede leer, no puede crear/editar/eliminar.
- **Validaciones**: express-validator en todos los endpoints críticos.

## Logging
- **Winston**: Logs de aplicación en consola y en archivo `logs/app.log`.
- **Morgan**: Logs HTTP integrados con winston.

## Automatización de licencias
- Cada admin tiene un campo `fechaExpiracion`.
- Un cron job diario desactiva automáticamente a los admins cuya licencia ha expirado.
- El middleware también bloquea acciones si la fecha ya pasó, aunque el cron no haya corrido.

## Configuración y ejecución
- Variables en `.env` (`MONGODB_URI`, `PORT`, `JWT_SECRET`)
- Instalar dependencias: `npm install`
- Ejecutar servidor: `node server.js`
- Documentación Swagger: `/api-docs`

## Notas
- El superadmin puede asignar/renovar la fecha de expiración de cualquier admin.
- El sistema es extensible para agregar más entidades, endpoints o lógica de negocio.

---

Para detalles de cada endpoint, consulta la documentación Swagger incluida en el proyecto.
