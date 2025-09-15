# Documentación de Fetch API - E-commerce Backend

Guía completa sobre cómo usar las funciones fetch para interactuar con nuestra API REST.

---

## 📦 Servicio API (`src/services/api.js`)

### Configuración Base

```javascript
const API_BASE_URL = 'http://localhost:3001'
```

**Propósito**: URL base del servidor Express para todas las llamadas API.

---

## 🛍️ Fetch de Productos

### `fetchProducts(category)`

**Función principal para obtener productos del servidor.**

```javascript
export const fetchProducts = async (category = null) => {
  try {
    const url = category
      ? `${API_BASE_URL}/products?category=${category}`
      : `${API_BASE_URL}/products`

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const products = await response.json()
    return products
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}
```

#### Parámetros
- **`category`** (opcional): String con el nombre de la categoría a filtrar
  - Si es `null` o no se proporciona: obtiene todos los productos
  - Si tiene valor: filtra productos por categoría específica

#### Funcionamiento Paso a Paso

1. **Construcción de URL**:
   ```javascript
   const url = category
     ? `${API_BASE_URL}/products?category=${category}`
     : `${API_BASE_URL}/products`
   ```
   - **Sin categoría**: `http://localhost:3001/products`
   - **Con categoría**: `http://localhost:3001/products?category=electronics`

2. **Llamada HTTP**:
   ```javascript
   const response = await fetch(url)
   ```
   - Usa `fetch()` nativo del navegador
   - Método GET por defecto
   - `await` espera la respuesta del servidor

3. **Validación de Respuesta**:
   ```javascript
   if (!response.ok) {
     throw new Error(`HTTP error! status: ${response.status}`)
   }
   ```
   - Verifica si la respuesta fue exitosa (200-299)
   - Lanza error si hay problemas de conexión o servidor

4. **Conversión a JSON**:
   ```javascript
   const products = await response.json()
   ```
   - Convierte el stream de respuesta a objeto JavaScript
   - El servidor responde con formato:
   ```json
   {
     "success": true,
     "message": "Products retrieved successfully",
     "data": [productos...]
   }
   ```

5. **Retorno de Datos**:
   ```javascript
   return products
   ```
   - Devuelve el objeto completo de respuesta
   - El componente React accede a `products.data` para los productos

6. **Manejo de Errores**:
   ```javascript
   catch (error) {
     console.error('Error fetching products:', error)
     throw error
   }
   ```
   - Captura cualquier error (red, parsing, etc.)
   - Lo registra en console para debugging
   - Re-lanza el error para que el componente lo maneje

---

### `fetchProductById(id)`

**Función para obtener un producto específico por su ID.**

```javascript
export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const product = await response.json()
    return product
  } catch (error) {
    console.error('Error fetching product:', error)
    throw error
  }
}
```

#### Parámetros
- **`id`**: Number o String del ID del producto

#### Funcionamiento
1. **URL específica**: `http://localhost:3001/products/1`
2. **Respuesta individual**: Un solo producto en lugar de array
3. **Error 404**: Si el producto no existe

---

## 🔄 Uso en Componentes React

### Con useEffect

```javascript
import { useState, useEffect } from 'react'
import { fetchProducts } from './services/api'

function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        const data = await fetchProducts()
        setProducts(data.data) // Acceder a data.data por el formato de respuesta
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  if (loading) return <div>Cargando...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  )
}
```

### Con Filtrado por Categoría

```javascript
const [selectedCategory, setSelectedCategory] = useState('')

useEffect(() => {
  const loadProducts = async () => {
    try {
      setLoading(true)
      const category = selectedCategory || null
      const data = await fetchProducts(category)
      setProducts(data.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  loadProducts()
}, [selectedCategory]) // Re-ejecuta cuando cambia la categoría
```

---

## 🎯 Casos de Uso Comunes

### 1. Cargar Todos los Productos
```javascript
const products = await fetchProducts()
// GET http://localhost:3001/products
```

### 2. Filtrar por Categoría
```javascript
const electronics = await fetchProducts('electronics')
// GET http://localhost:3001/products?category=electronics
```

### 3. Obtener Producto Específico
```javascript
const product = await fetchProductById(1)
// GET http://localhost:3001/products/1
```

### 4. Manejo de Errores
```javascript
try {
  const products = await fetchProducts()
  console.log(products.data)
} catch (error) {
  if (error.message.includes('404')) {
    console.log('No se encontraron productos')
  } else if (error.message.includes('500')) {
    console.log('Error del servidor')
  } else {
    console.log('Error de conexión')
  }
}
```

---

## ⚡ Optimizaciones y Mejores Prácticas

### 1. Evitar Llamadas Innecesarias
```javascript
useEffect(() => {
  if (selectedCategory !== previousCategory) {
    loadProducts()
  }
}, [selectedCategory])
```

### 2. Cancelar Requests en Unmount
```javascript
useEffect(() => {
  const abortController = new AbortController()

  const loadProducts = async () => {
    try {
      const response = await fetch(url, {
        signal: abortController.signal
      })
      // ... resto del código
    } catch (error) {
      if (error.name !== 'AbortError') {
        setError(error.message)
      }
    }
  }

  loadProducts()

  return () => abortController.abort()
}, [])
```

### 3. Cache Simple
```javascript
const cache = new Map()

export const fetchProductsCached = async (category) => {
  const key = category || 'all'
  if (cache.has(key)) {
    return cache.get(key)
  }

  const products = await fetchProducts(category)
  cache.set(key, products)
  return products
}
```

---

## 🐛 Debugging

### Herramientas de Desarrollo
1. **Network Tab**: Ver requests HTTP reales
2. **Console**: Logs de errores y datos
3. **React DevTools**: Estado de componentes

### Logs Útiles
```javascript
console.log('Fetching products with category:', category)
console.log('API Response:', response)
console.log('Parsed data:', products)
console.log('Products count:', products.data?.length)
```

---

## 📋 Respuestas del Servidor

### Éxito
```json
{
  "success": true,
  "message": "Products retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Producto",
      "price": 99.99,
      "category": "electronics",
      "stock": 10,
      "tags": ["tag1", "tag2"]
    }
  ]
}
```

### Error
```json
{
  "success": false,
  "message": "Product not found",
  "data": null
}
```

---

Este sistema de fetch proporciona una base sólida para la comunicación frontend-backend con manejo robusto de errores y flexibilidad para filtrado.