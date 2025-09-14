import { createContext, useState, useContext } from 'react';

// Crear el contexto
export const CartContext = createContext();

// Hook personalizado para usar el contexto
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe ser usado dentro de un CartProvider');
    }
    return context;
};

// Provider del contexto
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [totalItems, setTotalItems] = useState(0);

    // El valor que se proveerá al contexto
    const value = {
        cart,
        setCart,
        totalItems,
        setTotalItems
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
