import React, { useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import "./LoginForm.css";


const LoginForm = ({ onShowRegister }) => {
  const { login, error, isAuthenticated } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="login-container">
      <div className="breadcrumb">
        Inicio <span>&gt;</span> Mi Cuenta <span>&gt;</span> Login
      </div>
      <h2>Iniciá sesión</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ingresá tu email"
          required
        />
        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingresá tu contraseña"
          required
        />
        <div className="forgot-password">
          <a href="#">¿Olvidaste tu contraseña?</a>
        </div>
        {error && <div className="login-error">{error}</div>}
        {isAuthenticated && <div className="login-success">¡Bienvenido a Haversack!</div>}
        <button type="submit">Iniciar sesión</button>
      </form>
      <div className="login-footer">
        <span>¿No tenés cuenta?</span>
        <button className="register-btn" type="button" onClick={onShowRegister}>Registrate</button>
      </div>
    </div>
  );
};

export default LoginForm;
