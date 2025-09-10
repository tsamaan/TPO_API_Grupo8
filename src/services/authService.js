
// Usuarios en memoria (simulación)
let users = [
  {
    nombre: "Test",
    apellido: "User",
    email: "test@haversack.com",
    usuario: "testuser",
    password: "123456"
  }
];

export function loginService(email, password) {
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    return { success: true, user };
  } else {
    return { success: false, message: "Usuario o contraseña incorrectos" };
  }
}

export function registerService(data) {
  // Validar si ya existe el email o usuario
  if (users.some(u => u.email === data.email)) {
    return { success: false, message: "El email ya está registrado" };
  }
  if (users.some(u => u.usuario === data.usuario)) {
    return { success: false, message: "El usuario ya está registrado" };
  }
  users.push({ ...data });
  return { success: true };
}
