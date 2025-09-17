import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, inCart, onAdd, onRemove }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-card-img" />
      <div className="product-card-info">
        <h3 className="product-card-name">{product.name}</h3>
        <div className="product-card-tags">
          {product.tags && product.tags.map((tag, idx) => (
            <span key={idx} className="product-card-tag">{tag}</span>
          ))}
        </div>
        <div className="product-card-price">${product.price.toLocaleString('es-AR')}</div>
        
      </div>
    </div>
  );
};

export default ProductCard;
