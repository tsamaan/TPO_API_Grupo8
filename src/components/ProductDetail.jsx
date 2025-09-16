import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/api';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getProductById(id)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('No se pudo cargar el producto.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Producto no encontrado.</div>;

  return (
    <div className="product-detail-container">
      <img src={product.imagen || '/placeholder-logo.png'} alt={product.nombre} className="product-detail-image" />
      <div className="product-detail-info">
        <h2>{product.nombre}</h2>
        <p><strong>Categoría:</strong> {product.categoria}</p>
        <p><strong>Descripción:</strong> {product.descripcion}</p>
        <p><strong>Precio:</strong> ${product.precio}</p>
        <p><strong>Stock:</strong> {product.stock}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
