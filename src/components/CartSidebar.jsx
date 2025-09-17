

import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { updateProduct, getProductById } from '../services/api';
import './CartSidebar.css';

const CartSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { cart, removeFromCart, addToCart, calculateTotal, clearCart } = useCart();

  // Simulación de stock en memoria (solo para frontend)
  const stockMap = React.useRef({});
  React.useEffect(() => {
    // Inicializar stockMap solo una vez por producto
    cart.forEach(item => {
      if (stockMap.current[item.id] === undefined) {
        stockMap.current[item.id] = item.stock ?? 10; // default 10 si no hay stock
      }
    });
  }, [cart]);

  if (!isOpen) return null;


  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      addToCart(item, -1);
    }
  };

  const handleIncrease = (item) => {
    // Solo sumar si hay stock disponible
    const stockRestante = stockMap.current[item.id] - item.quantity;
    if (stockRestante > 0) {
      addToCart(item, 1);
    } else {
      alert('No hay más stock disponible de este producto');
    }
  };

  const totalPrice = calculateTotal();


  // Simular reducción de stock (solo frontend)
  const reduceStock = () => {
    cart.forEach(item => {
      stockMap.current[item.id] = stockMap.current[item.id] - item.quantity;
    });
  };



  const handleBuy = async () => {
    // Validar stock en la API antes de comprar
    try {
      const stockCheck = await Promise.all(
        cart.map(async item => {
          const productoApi = await getProductById(item.id);
          return productoApi.stock >= item.quantity;
        })
      );
      const sinStock = stockCheck.some(valid => !valid);
      if (sinStock) {
        alert('No hay suficiente stock disponible para uno o más productos. Actualiza la página y vuelve a intentar.');
        return;
      }
      // Reducir stock en la API
      await Promise.all(
        cart.map(async item => {
          const productoApi = await getProductById(item.id);
          const nuevoStock = productoApi.stock - item.quantity;
          await updateProduct(item.id, { ...productoApi, stock: nuevoStock });
          stockMap.current[item.id] = nuevoStock;
        })
      );
      reduceStock();
      clearCart();
  alert('¡Compra generada con éxito!');
  onClose();
  navigate('/');
  window.location.reload();
    } catch (err) {
      alert('Error al validar o actualizar el stock en la API');
    }
  };

  return (
    <div className="cart-sidebar-overlay" onClick={onClose}>
      <aside className="cart-sidebar" onClick={e => e.stopPropagation()}>
        <h2 className="cart-title">Carrito de Compras</h2>
        <div className="cart-items-list">
          {cart.length === 0 ? (
            <div className="cart-empty">Tu carrito está vacío.</div>
          ) : (
            cart.map(item => (
              <div className="cart-item" key={item.id}>
                <img src={item.images?.[0] || item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">
                    ${typeof item.price === 'number' ? item.price.toLocaleString('es-AR') : '0'}
                  </div>
                  <div className="cart-item-stock">Stock disponible: {stockMap.current[item.id] - item.quantity}</div>
                  <div className="cart-item-controls">
                    <button onClick={() => handleDecrease(item)} disabled={item.quantity <= 1}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncrease(item)} disabled={stockMap.current[item.id] - item.quantity <= 0}>+</button>
                    <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>Eliminar</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="cart-summary">
          <div className="cart-total-row">
            <span>TOTAL:</span>
            <span>${totalPrice.toLocaleString('es-AR')}</span>
          </div>
          <div className="cart-cuotas">O hasta 24 cuotas de $ {(totalPrice/24).toLocaleString('es-AR')}</div>
          <div className="cart-subtotal-row">
            <span>SUBTOTAL:</span>
            <span>${totalPrice.toLocaleString('es-AR')}</span>
          </div>
          <div className="cart-envio-row">
            <span>ENVÍO:</span>
            <span>Calculálo arriba para verlo</span>
          </div>
          <button className="cart-buy-btn" onClick={handleBuy}>FINALIZAR COMPRA</button>
        </div>
        <button className="cart-close-btn" onClick={onClose} aria-label="Cerrar carrito">×</button>
      </aside>
    </div>
  );
};

export default CartSidebar;
