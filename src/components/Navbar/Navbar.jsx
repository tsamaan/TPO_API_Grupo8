import React from 'react';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const { totalItems } = useContext(CartContext);
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo-container">
          <Link to="/">
            <img 
              src="https://dcdn-us.mitiendanube.com/stores/005/572/435/themes/common/logo-361476303-1745245688-cc2c95556edd9c5e5c2d51e099859cfe1745245688.jpg?0" 
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