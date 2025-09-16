import { createContext, useState, useContext, useEffect } from 'react';
import { fetchCart, createCartItem, deleteCartItem } from '../services/api';

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
    // Cargar carrito desde la API al iniciar
    useEffect(() => {
        const loadCart = async () => {
            try {
                const apiCart = await fetchCart();
                setCart(apiCart);
                setTotalItems(apiCart.reduce((acc, item) => acc + (item.quantity || 1), 0));
            } catch (error) {
                setCart([]);
                setTotalItems(0);
            }
        };
        loadCart();
    }, []);

    // Agregar producto al carrito y a la API (ahora síncrono para evitar problemas de renderizado)
    const addToCart = (product, quantity = 1) => {
        if (!product.stock || product.stock < quantity) {
            throw new Error('No hay suficiente stock disponible');
        }
        setCart(currentCart => {
            const existingProductIndex = currentCart.findIndex(item => item.id === product.id);
            if (existingProductIndex >= 0) {
                const updatedCart = [...currentCart];
                updatedCart[existingProductIndex].quantity += quantity;
                return updatedCart;
            } else {
                return [...currentCart, { ...product, quantity }];
            }
        });
        setTotalItems(prevTotal => prevTotal + quantity);
        // Opcional: llamar a la API en segundo plano
        createCartItem({ ...product, quantity }).catch(() => {});
    };

    // Eliminar producto del carrito y de la API
    const removeFromCart = (productId) => {
        setCart(currentCart => {
            const productToRemove = currentCart.find(item => item.id === productId);
            if (!productToRemove) {
                throw new Error('El producto no existe en el carrito');
            }
            setTotalItems(prevTotal => prevTotal - productToRemove.quantity);
            return currentCart.filter(item => item.id !== productId);
        });
        // Eliminar en la API
        deleteCartItem(productId).catch(() => {});
    };

    // Vaciar el carrito
    const clearCart = () => {
        setCart([]);
        setTotalItems(0);
    };

    // Calcular el total
    const calculateTotal = () => {
        return cart.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    };

    // Checkout (sincronización con API pendiente)
    const checkout = async () => {
        // ...igual que antes, pendiente de integración API
        clearCart();
        return {
            success: true,
            total: calculateTotal()
        };
    };

    const value = {
        cart,
        setCart,
        totalItems,
        setTotalItems,
        addToCart,
        removeFromCart,
        clearCart,
        calculateTotal,
        checkout
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
