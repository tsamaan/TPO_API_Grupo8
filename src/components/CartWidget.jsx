import React from 'react';
import { useCart } from '../context/CartContext';
import './CartWidget.css';

const CartWidget = ({ onMenuClick }) => {
  const { cart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <div className="cart-widget">
      <div className="cart-icon-container" onClick={onMenuClick} style={{ cursor: 'pointer' }}>
        <svg className="cart-icon" viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
          <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7.16 14l.84-2h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0 0 20 4H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7.42c-.14 0-.25-.11-.26-.25z"/>
        </svg>
        {totalItems > 0 && (
          <span className="cart-count">{totalItems}</span>
        )}
      </div>
    </div>
  );
};

export default CartWidget;
