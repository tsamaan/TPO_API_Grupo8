# feat: redirigir usuario tras login

## Archivos modificados
- `src/App.jsx`
- `src/context/AuthContext.jsx`

## Descripción
- Se implementa la redirección automática a una pantalla protegida tras un login exitoso.
- Si el usuario está autenticado, se muestra un mensaje de bienvenida y un botón para cerrar sesión (logout).
- El logout permite volver a la pantalla de login/registro.
- No se implementa una home real, solo una pantalla protegida temporal para cumplir con el flujo de autenticación.
