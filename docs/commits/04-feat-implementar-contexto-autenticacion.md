# feat: implementar contexto de autenticación

## Archivos modificados
- `src/features/user/context/AuthContext.jsx`
- `src/features/user/services/authService.js`
- `src/features/user/components/auth/RegisterForm/RegisterForm.jsx`

## Descripción
- Se extiende el contexto de autenticación para manejar el registro y login de usuarios en memoria.
- Se permite registrar nuevos usuarios y validar credenciales en el login.
- El formulario de registro ahora utiliza el contexto para registrar usuarios y muestra mensajes de éxito o error.
- Se previene el registro de emails o usuarios duplicados.
