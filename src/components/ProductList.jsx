import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import { CartContext } from '../context/CartContext';
import ProductCard from './ProductCard';
import './ProductList.css';

const formatPrice = (value) => {
  if (typeof value !== 'number') {
    return value
  }

  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  }).format(value)
}

const ProductList = ({ category: propCategory = null }) => {
  const params = useParams();
  const category = params.categoria || propCategory;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  useEffect(() => {
    let isSubscribed = true;

    const loadProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchProducts(category);
        if (isSubscribed) {
          setProducts(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (isSubscribed) {
          setError(err.message || 'Error al cargar los productos');
          setProducts([]);
        }
      } finally {
        if (isSubscribed) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      isSubscribed = false;
    };
  }, [category]);

  if (loading) {
    return <div className="product-list__feedback">Cargando productos...</div>;
  }

  if (error) {
    return (
      <div className="product-list__feedback product-list__feedback--error" role="alert">
        {error}
      </div>
    );
  }

  if (!products.length) {
    return <div className="product-list__feedback">No hay productos disponibles.</div>;
  }

  const categorias = [
    { nombre: 'Mochilas', valor: 'mochilas' },
    { nombre: 'Bolsos', valor: 'bolsos' },
    { nombre: 'Materos', valor: 'materos' },
    { nombre: 'Accesorios', valor: 'accesorios' },
  ];

  return (
    <div>
      <div className="category-nav" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', justifyContent: 'center' }}>
        <Link to="/productos" style={{ fontWeight: !category ? 'bold' : 'normal' }}>Todos</Link>
        {categorias.map(cat => (
          <Link
            key={cat.valor}
            to={`/productos/categoria/${cat.valor}`}
            style={{ fontWeight: category === cat.valor ? 'bold' : 'normal' }}
          >
            {cat.nombre}
          </Link>
        ))}
      </div>
      <div className="product-list">
        {products.map((product) => {
          const key = product.id || product.sku || product.title || product.name;
          const inCart = cart.some(item => item.id === product.id);
          return (
            <Link key={key} to={`/productos/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ProductCard
                product={product}
                inCart={inCart}
                onAdd={addToCart}
                onRemove={removeFromCart}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default ProductList