import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import ProductList from '../components/ProductList';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <Navbar />
      <main className="main-content">
        <section className="hero-section">
          <h1>Bienvenido a Haversack</h1>
          <p>Tu tienda online de confianza</p>
        </section>
        <section className="products-section">
          <div className="products-header">
            <h2>Productos destacados</h2>
            <p>Explora nuestro catalogo actualizado en tiempo real.</p>
          </div>
          <ProductList />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;