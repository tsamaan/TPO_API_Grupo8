import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/api';
import './ProductDetail.css';

const cuotas = 24;
const descuento = 0.46; // 46% OFF como en el ejemplo

// SVGs de medios de pago (inline para no depender de imágenes externas)
const visaSVG = (
  <svg width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="38" height="24" rx="3" fill="#fff"/><text x="7" y="17" fontSize="13" fontFamily="Arial" fill="#1A1F71">VISA</text></svg>
);
const mastercardSVG = (
  <svg width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="38" height="24" rx="3" fill="#fff"/><circle cx="15" cy="12" r="7" fill="#EB001B"/><circle cx="23" cy="12" r="7" fill="#F79E1B" fillOpacity="0.8"/><text x="7" y="21" fontSize="7" fontFamily="Arial" fill="#222">MC</text></svg>
);
const mercadopagoSVG = (
  <svg width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="38" height="24" rx="3" fill="#fff"/><ellipse cx="19" cy="12" rx="10" ry="7" fill="#00B1EA"/><text x="8" y="17" fontSize="8" fontFamily="Arial" fill="#fff">MPago</text></svg>
);

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [added, setAdded] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    getProductById(id)
      .then((data) => {
        console.log('Producto obtenido:', data);
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('No se pudo cargar el producto.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="product-detail-loading">Cargando...</div>;
  if (error) return <div className="product-detail-error">{error}</div>;
  if (!product) return <div className="product-detail-error">Producto no encontrado.</div>;

  // Adaptar campos del producto
  const nombre = product.name || product.nombre;
  const descripcion = product.description || product.descripcion;
  // Normalizar ruta de imagen para que funcione en el navegador
  let imagen = product.image || product.imagen;
  if (imagen && imagen.startsWith('.')) {
    // Quitar el "." inicial y reemplazar backslash por slash para rutas Windows
    imagen = imagen.replace(/^\./, '').replace(/\\/g, '/').replace(/\//g, '/');
  }
  const precio = Number(product.price || product.precio);
  const stock = Number(product.stock);
  const categoria = product.category || product.categoria;

  // Cálculo de precios y cuotas
  const precioOriginal = precio ? (precio / (1 - descuento)).toFixed(2) : null;
  const precioCuota = precio ? (precio / cuotas).toFixed(2) : null;

  const handleCantidad = (e) => {
    let val = parseInt(e.target.value, 10);
    if (isNaN(val) || val < 1) val = 1;
    if (val > stock) val = stock;
    setCantidad(val);
  };

  const handleAddCart = () => {
    // Armar el objeto producto con los campos que espera el carrito
    const productoParaCarrito = {
      id: product.id,
      name: nombre,
      price: precio,
      image: imagen,
      stock: stock,
      category: categoria
    };
    addToCart(productoParaCarrito, cantidad);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="product-detail-haversack">
      <div className="product-detail-haversack-imgbox">
        <img
          src={imagen || '/placeholder-logo.png'}
          alt={nombre}
          className="product-detail-haversack-img"
        />
      </div>
      <div className="product-detail-haversack-info">
        <div className="product-detail-haversack-breadcrumb">
          INICIO {'>'} PRODUCTOS {'>'} {categoria?.toUpperCase() || 'CATEGORÍA'} {'>'} {nombre}
        </div>
        <h1 className="product-detail-haversack-title">{nombre}</h1>
        <div className="product-detail-haversack-prices">
          <span className="product-detail-haversack-price">${precio?.toLocaleString('es-AR')}</span>
          {precioOriginal && (
            <span className="product-detail-haversack-original">${Number(precioOriginal).toLocaleString('es-AR')}</span>
          )}
          <span className="product-detail-haversack-off">46% OFF</span>
        </div>
        <div className="product-detail-haversack-descuento">
          <span className="product-detail-haversack-descuento-rojo">10% de descuento</span> pagando con Transferencia o depósito
        </div>
        <div className="product-detail-haversack-cuotas">
          {cuotas} cuotas de <b>${precioCuota}</b>
        </div>
        <div className="product-detail-haversack-pagos">
          <span title="Visa">{visaSVG}</span>
          <span title="Mastercard">{mastercardSVG}</span>
          <span title="MercadoPago">{mercadopagoSVG}</span>
          <a href="#" className="product-detail-haversack-link">Ver medios de pago</a>
        </div>
        <div className="product-detail-haversack-cantidad">
          <span>Cantidad</span>
          <input
            type="number"
            min={1}
            max={stock}
            value={cantidad}
            onChange={handleCantidad}
            className="product-detail-haversack-cantidad-input"
          />
        </div>
        <button
          className="product-detail-haversack-addcart"
          onClick={handleAddCart}
          disabled={stock < 1}
        >
          {added ? '¡AGREGADO!' : 'AGREGAR AL CARRITO'}
        </button>
        <div className="product-detail-haversack-description">
          <b>{nombre}</b>: {descripcion}
        </div>
        <div className="product-detail-haversack-stock">
          <b>Stock:</b> {stock}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
