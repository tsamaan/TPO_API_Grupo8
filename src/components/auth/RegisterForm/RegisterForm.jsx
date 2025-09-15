import React, { useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import "./RegisterForm.css";



const RegisterForm = ({ onShowLogin }) => {
  const { register, error } = useContext(AuthContext);
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    usuario: "",
    password: "",
    confirmPassword: ""
  });
  const [localError, setLocalError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setLocalError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validaciones
    if (!form.nombre || !form.apellido || !form.email || !form.usuario || !form.password || !form.confirmPassword) {
      setLocalError("Todos los campos son obligatorios");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setLocalError("Las contraseñas no coinciden");
      return;
    }
    setLocalError("");
    const ok = register(form);
    if (ok) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onShowLogin();
      }, 1500);
    }
  };

  return (
    <div className="register-container">
      <h2>Crear cuenta</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Tu nombre"
          required
        />
        <label htmlFor="apellido">Apellido</label>
        <input
          id="apellido"
          name="apellido"
          type="text"
          value={form.apellido}
          onChange={handleChange}
          placeholder="Tu apellido"
          required
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="ejemplo@email.com"
          required
        />
        <label htmlFor="usuario">Usuario</label>
        <input
          id="usuario"
          name="usuario"
          type="text"
          value={form.usuario}
          onChange={handleChange}
          placeholder="Nombre de usuario"
          required
        />
        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Contraseña"
          required
        />
        <label htmlFor="confirmPassword">Repetir contraseña</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Repetir contraseña"
          required
        />
  {localError && <div className="register-error">{localError}</div>}
  {error && !localError && <div className="register-error">{error}</div>}
  {success && <div className="login-success">¡Registro exitoso! Ahora podés iniciar sesión.</div>}
        <button type="submit">Registrarme</button>
      </form>
      <div className="register-footer">
        <span>¿Ya tenés cuenta?</span>
        <button className="login-btn" type="button" onClick={onShowLogin}>Iniciar sesión</button>
      </div>
    </div>
  );
};

export default RegisterForm;
