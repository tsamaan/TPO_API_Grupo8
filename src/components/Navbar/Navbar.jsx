import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo-container">
          <Link to="/">
            <img 
              src="/placeholder-logo.png" 
              alt="Haversack" 
              className="logo"
            />
          </Link>
        </div>
        
        <div className="nav-links">
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/productos" className="nav-link">Productos &gt;</Link>
          <Link to="/contacto" className="nav-link">Contacto</Link>
        </div>

        <div className="nav-footer">
          <div className="social-media">
            <p>INSTAGRAM</p>
          </div>
          <div className="auth-buttons">
            <Link to="/registro" className="auth-link">CREAR CUENTA</Link>
            <Link to="/login" className="auth-link">INGRESAR</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;