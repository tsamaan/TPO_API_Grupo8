import React from 'react';
import ProductList from '../components/ProductList';
import BannerSwiper from '../components/BannerSwiper';

const promos = [
  "¡TODA LA WEB CON DESCUENTOS INPERDIBLES!",
  "Envío gratis en compras mayores a $20.000",
  "3 y 6 cuotas sin interés"
];
const ProductsPage = ({ filterOpen, onFilterClose, onProductCountChange, category }) => {
  return (
    <main className="main">
      <BannerSwiper promos={promos} />
      <section className="products-section">
        <div className="products-header" style={{ marginTop: '2.5rem', padding: '1.5rem 2rem', background: 'linear-gradient(90deg, #f8fafc 60%, #e0e7ff 100%)', borderRadius: '1.2rem', boxShadow: '0 2px 12px rgba(60,60,120,0.08)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#3b3b5c', marginBottom: '0.3rem', letterSpacing: '0.02em' }}>🛒 Productos</h2>
          <p style={{ fontSize: '1.1rem', color: '#5c5c7a', margin: 0 }}>Explora nuestro catálogo actualizado en tiempo real y encuentra las mejores ofertas.</p>
        </div>
        <ProductList 
          filterOpen={filterOpen}
          onFilterClose={onFilterClose}
          onProductCountChange={onProductCountChange}
          category={category}
        />
      </section>
    </main>
  );
};

export default ProductsPage;
