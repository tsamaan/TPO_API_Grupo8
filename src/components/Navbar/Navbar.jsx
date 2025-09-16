import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import CategorySidebar from '../CategorySidebar'
import './Navbar.css'

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <aside className="navbar">
      <div className="navbar__top">
        <Link to="/" className="navbar__logo" aria-label="Ir al inicio">
          <img
            src="https://dcdn-us.mitiendanube.com/stores/005/572/435/themes/common/logo-361476303-1745245688-cc2c95556edd9c5e5c2d51e099859cfe1745245688.jpg?0"
            alt="Haversack"
          />
        </Link>

        <nav className="navbar__menu" aria-label="Navegacion principal">
          <NavLink to="/" className="navbar__link">
            Inicio
          </NavLink>
          <button
            type="button"
            className="navbar__link navbar__link--button"
            onClick={() => setSidebarOpen(true)}
            aria-expanded={sidebarOpen}
            aria-controls="category-sidebar"
          >
            Productos <span aria-hidden="true">&gt;</span>
          </button>
          <NavLink to="/contacto" className="navbar__link">
            Contacto
          </NavLink>
        </nav>
      </div>

      <div className="navbar__bottom">
        <p className="navbar__social">INSTAGRAM</p>
        <div className="navbar__actions">
          <Link to="/registro" className="navbar__action">
            CREAR CUENTA
          </Link>
          <Link to="/login" className="navbar__action">
            INGRESAR
          </Link>
        </div>
      </div>

      <CategorySidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </aside>
  )
}

export default Navbar