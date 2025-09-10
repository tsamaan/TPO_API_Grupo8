// Usuario de prueba
const testUser = {
  email: "test@haversack.com",
  password: "123456"
};

export function loginService(email, password) {
  if (email === testUser.email && password === testUser.password) {
    return { success: true };
  } else {
    return { success: false, message: "Usuario o contraseña incorrectos" };
  }
}
