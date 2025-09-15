import { useEffect, useState } from 'react'
import { fetchProducts } from '../services/api'
import './ProductList.css'

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

const ProductList = ({ category = null }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isSubscribed = true

    const loadProducts = async () => {
      setLoading(true)
      setError(null)

      try {
        const data = await fetchProducts(category)
        if (isSubscribed) {
          setProducts(Array.isArray(data) ? data : [])
        }
      } catch (err) {
        if (isSubscribed) {
          setError(err.message || 'Error al cargar los productos')
          setProducts([])
        }
      } finally {
        if (isSubscribed) {
          setLoading(false)
        }
      }
    }

    loadProducts()

    return () => {
      isSubscribed = false
    }
  }, [category])

  if (loading) {
    return <div className="product-list__feedback">Cargando productos...</div>
  }

  if (error) {
    return (
      <div className="product-list__feedback product-list__feedback--error" role="alert">
        {error}
      </div>
    )
  }

  if (!products.length) {
    return <div className="product-list__feedback">No hay productos disponibles.</div>
  }

  return (
    <div className="product-list">
      {products.map((product) => {
        const key = product.id || product.sku || product.title || product.name

        return (
          <article className="product-list__item" key={key}>
            {product.image && (
              <img
                className="product-list__image"
                src={product.image}
                alt={product.title || product.name || 'Producto'}
                loading="lazy"
              />
            )}
            <div className="product-list__body">
              <h3 className="product-list__title">{product.title || product.name}</h3>
              {product.description && (
                <p className="product-list__description">{product.description}</p>
              )}
              {typeof product.price !== 'undefined' && (
                <p className="product-list__price">{formatPrice(product.price)}</p>
              )}
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default ProductList