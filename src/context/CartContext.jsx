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

    // Función para agregar productos al carrito
    const addToCart = (product, quantity = 1) => {
        if (!product.stock || product.stock < quantity) {
            throw new Error('No hay suficiente stock disponible');
        }

        setCart(currentCart => {
            // Buscar si el producto ya existe en el carrito
            const existingProductIndex = currentCart.findIndex(
                item => item.id === product.id
            );

            if (existingProductIndex >= 0) {
                // Si el producto existe, actualizamos la cantidad
                const updatedCart = [...currentCart];
                const newQuantity = updatedCart[existingProductIndex].quantity + quantity;
                
                // Verificar que no exceda el stock disponible
                if (newQuantity > product.stock) {
                    throw new Error('La cantidad excede el stock disponible');
                }

                updatedCart[existingProductIndex].quantity = newQuantity;
                return updatedCart;
            } else {
                // Si el producto no existe, lo agregamos al carrito
                return [...currentCart, { ...product, quantity }];
            }
        });

        // Actualizar el total de items
        setTotalItems(prevTotal => prevTotal + quantity);
    };

    // El valor que se proveerá al contexto
    const value = {
        cart,
        setCart,
        totalItems,
        setTotalItems,
        addToCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
