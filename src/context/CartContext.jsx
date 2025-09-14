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

    // Función para eliminar un producto del carrito
    const removeFromCart = (productId) => {
        setCart(currentCart => {
            // Buscar el producto en el carrito
            const productToRemove = currentCart.find(item => item.id === productId);
            
            if (!productToRemove) {
                throw new Error('El producto no existe en el carrito');
            }

            // Actualizar el total de items
            setTotalItems(prevTotal => prevTotal - productToRemove.quantity);

            // Filtrar el carrito para eliminar el producto
            return currentCart.filter(item => item.id !== productId);
        });
    };

    // Función para vaciar completamente el carrito
    const clearCart = () => {
        setCart([]);
        setTotalItems(0);
    };

    // Función para calcular el total de la compra
    const calculateTotal = () => {
        return cart.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    };

    // Función para procesar el checkout y actualizar el stock
    const checkout = async () => {
        try {
            // Verificar stock disponible antes de procesar
            for (const item of cart) {
                if (item.quantity > item.stock) {
                    throw new Error(`Stock insuficiente para ${item.name}`);
                }
            }

            // Actualizar el stock de cada producto
            for (const item of cart) {
                const response = await fetch(`/api/productos/${item.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        stock: item.stock - item.quantity
                    })
                });

                if (!response.ok) {
                    throw new Error(`Error al actualizar el stock de ${item.name}`);
                }
            }

            // Limpiar el carrito después de una compra exitosa
            clearCart();
            return {
                success: true,
                total: calculateTotal()
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    };

    // El valor que se proveerá al contexto
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
