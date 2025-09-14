import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <Navbar />
      <main className="main-content">
        <div className="hero-section">
          <h1>Bienvenido a Haversack</h1>
          <p>Tu tienda online de confianza</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;