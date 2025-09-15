import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          Defensa de las y los consumidores. Para reclamos{' '}
          <a href="#" className="footer-link">ingresá acá</a>
          {' / '}
          <a href="#" className="footer-link">Botón de arrepentimiento</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;