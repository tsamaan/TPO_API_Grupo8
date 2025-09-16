import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import { CartContext } from '../context/CartContext';
import ProductCard from './ProductCard';
import FilterSidebar from './FilterSidebar';
import './ProductList.css';

const ProductList = ({ category: propCategory = null }) => {
  const params = useParams();
  const category = params.categoria || propCategory;
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  useEffect(() => {
    let isSubscribed = true;

    const loadProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchProducts(category);
        if (isSubscribed) {
          const productsArray = Array.isArray(data) ? data : [];
          setAllProducts(productsArray);
          setFilteredProducts(productsArray);
        }
      } catch (err) {
        if (isSubscribed) {
          setError(err.message || 'Error al cargar los productos');
          setAllProducts([]);
          setFilteredProducts([]);
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

  const applyFilters = (filters) => {
    let result = [...allProducts];

    // Filtrar por colores
    if (filters.selectedColors.length > 0) {
      result = result.filter(product => 
        product.colours && 
        product.colours.some(color => filters.selectedColors.includes(color))
      );
    }

    // Filtrar por tags
    if (filters.selectedTags.length > 0) {
      result = result.filter(product => 
        product.tags && 
        product.tags.some(tag => filters.selectedTags.includes(tag))
      );
    }

    // Filtrar por rango de precio
    if (filters.priceRange.min !== '' || filters.priceRange.max !== '') {
      result = result.filter(product => {
        const price = parseFloat(product.price);
        const min = filters.priceRange.min !== '' ? parseFloat(filters.priceRange.min) : 0;
        const max = filters.priceRange.max !== '' ? parseFloat(filters.priceRange.max) : Infinity;
        return price >= min && price <= max;
      });
    }

    // Ordenar productos
    switch (filters.sortBy) {
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-asc':
        result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'price-desc':
        result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case 'newest':
        // Por defecto, mantener el orden original (más nuevos primero)
        break;
      case 'popular':
        // Ordenar por stock descendente como proxy de popularidad
        result.sort((a, b) => parseFloat(b.stock) - parseFloat(a.stock));
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  };

  const handleFilterChange = (filters) => {
    applyFilters(filters);
  };

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

  if (!allProducts.length) {
    return <div className="product-list__feedback">No hay productos disponibles.</div>;
  }

  const categorias = [
    { nombre: 'Mochilas', valor: 'mochilas' },
    { nombre: 'Bolsos', valor: 'bolsos' },
    { nombre: 'Materos', valor: 'materos' },
    { nombre: 'Accesorios', valor: 'accesorios' },
  ];

  return (
    <div className="product-list-container">
      {/* Header con navegación de categorías y botón de filtros */}
      <div className="product-list-header">
        <div className="category-nav">
          <Link to="/productos" className={!category ? 'active' : ''}>Todos</Link>
          {categorias.map(cat => (
            <Link
              key={cat.valor}
              to={`/productos/categoria/${cat.valor}`}
              className={category === cat.valor ? 'active' : ''}
            >
              {cat.nombre}
            </Link>
          ))}
        </div>
        
        <div className="filter-controls">
          <button 
            className="filter-button"
            onClick={() => setFilterSidebarOpen(true)}
          >
            <span>Filtros</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
          </button>
          
          <div className="results-count">
            {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Lista de productos */}
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
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
          })
        ) : (
          <div className="no-products-found">
            <p>No se encontraron productos que coincidan con los filtros seleccionados.</p>
            <button 
              className="clear-filters-link"
              onClick={() => applyFilters({
                sortBy: 'name',
                selectedColors: [],
                selectedTags: [],
                priceRange: { min: '', max: '' }
              })}
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>

      {/* Sidebar de filtros */}
      <FilterSidebar
        isOpen={filterSidebarOpen}
        onClose={() => setFilterSidebarOpen(false)}
        products={allProducts}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
}

export default ProductList