import React from 'react';
import { useCart } from '../context/CartContext';
import './CartSidebar.css';

const CartSidebar = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, addToCart, calculateTotal } = useCart();

  if (!isOpen) return null;

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      removeFromCart(item.id);
      addToCart(item, item.quantity - 1);
    }
  };

  const handleIncrease = (item) => {
    removeFromCart(item.id);
    addToCart(item, item.quantity + 1);
  };

  const totalPrice = calculateTotal();

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
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">${item.price.toLocaleString('es-AR')}</div>
                  <div className="cart-item-controls">
                    <button onClick={() => handleDecrease(item)} disabled={item.quantity <= 1}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncrease(item)}>+</button>
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
          <button className="cart-buy-btn">INICIAR COMPRA</button>
        </div>
        <button className="cart-close-btn" onClick={onClose} aria-label="Cerrar carrito">×</button>
      </aside>
    </div>
  );
};

export default CartSidebar;
