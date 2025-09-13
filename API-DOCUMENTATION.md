# API REST - E-commerce Backend

Documentación completa de endpoints disponibles en el servidor JSON Server.

**Base URL**: `http://localhost:3001`

---

## 🛍️ Productos

### Obtener todos los productos
```http
GET /products
```

**Respuesta**:
```json
[
  {
    "id": 1,
    "name": "Smartphone Samsung Galaxy",
    "price": 299.99,
    "description": "Smartphone con pantalla de 6.1 pulgadas y cámara de 48MP",
    "image": "https://via.placeholder.com/300x300?text=Samsung+Galaxy",
    "category": "electronics",
    "stock": 15,
    "tags": ["smartphone", "samsung", "android", "48mp", "pantalla grande"]
  }
]
```

### Obtener producto específico
```http
GET /products/{id}
```

**Ejemplo**: `GET /products/1`

### Buscar productos por tags
```http
GET /products?tags_like={tag}
```

**Ejemplo**: `GET /products?tags_like=smartphone`

### Filtrar por categoría
```http
GET /products?category={category}
```

**Ejemplo**: `GET /products?category=electronics`

### Crear nuevo producto
```http
POST /products
Content-Type: application/json

{
  "name": "Nuevo Producto",
  "price": 99.99,
  "description": "Descripción del producto",
  "image": "https://via.placeholder.com/300",
  "category": "electronics",
  "stock": 10,
  "tags": ["tag1", "tag2"]
}
```

### Actualizar producto completo
```http
PUT /products/{id}
Content-Type: application/json

{
  "name": "Producto Actualizado",
  "price": 199.99,
  "description": "Nueva descripción",
  "image": "https://via.placeholder.com/300",
  "category": "electronics",
  "stock": 5,
  "tags": ["nuevo", "actualizado"]
}
```

### Actualizar campos específicos
```http
PATCH /products/{id}
Content-Type: application/json

{
  "price": 89.99,
  "stock": 3
}
```

### Eliminar producto
```http
DELETE /products/{id}
```

---

## 👥 Usuarios

### Obtener todos los usuarios
```http
GET /users
```

**Respuesta**:
```json
[
  {
    "id": 1,
    "email": "juan@example.com",
    "name": "Juan Pérez",
    "address": "Av. Corrientes 1234, Buenos Aires",
    "phone": "+54 11 1234-5678"
  }
]
```

### Obtener usuario específico
```http
GET /users/{id}
```

**Ejemplo**: `GET /users/1`

### Crear nuevo usuario
```http
POST /users
Content-Type: application/json

{
  "email": "nuevo@example.com",
  "name": "Nuevo Usuario",
  "address": "Dirección completa",
  "phone": "+54 11 0000-0000"
}
```

### Actualizar usuario
```http
PUT /users/{id}
Content-Type: application/json

{
  "email": "actualizado@example.com",
  "name": "Usuario Actualizado",
  "address": "Nueva dirección",
  "phone": "+54 11 1111-1111"
}
```

### Eliminar usuario
```http
DELETE /users/{id}
```

---

## 🛒 Carrito

### Obtener todos los carritos
```http
GET /cart
```

**Respuesta**:
```json
[
  {
    "id": 1,
    "userId": 1,
    "products": [
      {
        "productId": 1,
        "quantity": 1,
        "price": 299.99
      }
    ],
    "total": 299.99,
    "createdAt": "2025-01-15T10:30:00Z",
    "updatedAt": "2025-01-15T10:30:00Z"
  }
]
```

### Obtener carrito por usuario
```http
GET /cart?userId={userId}
```

**Ejemplo**: `GET /cart?userId=1`

### Obtener carrito específico
```http
GET /cart/{id}
```

### Crear nuevo carrito
```http
POST /cart
Content-Type: application/json

{
  "userId": 1,
  "products": [
    {
      "productId": 1,
      "quantity": 2,
      "price": 299.99
    }
  ],
  "total": 599.98,
  "createdAt": "2025-01-15T16:00:00Z",
  "updatedAt": "2025-01-15T16:00:00Z"
}
```

### Actualizar carrito completo
```http
PUT /cart/{id}
Content-Type: application/json

{
  "userId": 1,
  "products": [
    {
      "productId": 1,
      "quantity": 1,
      "price": 299.99
    },
    {
      "productId": 2,
      "quantity": 2,
      "price": 59.99
    }
  ],
  "total": 419.97,
  "updatedAt": "2025-01-15T17:30:00Z"
}
```

### Eliminar carrito
```http
DELETE /cart/{id}
```

---

## 🚀 Uso del Servidor

### Iniciar el servidor
```bash
npm run server
```

El servidor estará disponible en `http://localhost:3001`

### Endpoints de desarrollo
- **API Base**: `http://localhost:3001`
- **Interfaz JSON Server**: `http://localhost:3001` (navegador)

---

## 📝 Notas Importantes

1. **IDs**: Se generan automáticamente al crear nuevos recursos
2. **Timestamps**: Incluir `createdAt` e `updatedAt` en formato ISO 8601
3. **Validación**: JSON Server valida automáticamente el formato JSON
4. **CORS**: Habilitado por defecto para desarrollo frontend
5. **Tags**: Array de strings para búsqueda y filtrado
6. **Precios**: Formato decimal (ej: `299.99`)
7. **Stock**: Número entero

---

## 🛠️ Ejemplos de Uso con JavaScript

### Fetch básico
```javascript
// Obtener productos
const response = await fetch('http://localhost:3001/products');
const products = await response.json();

// Crear producto
const newProduct = {
  name: "Producto Nuevo",
  price: 149.99,
  description: "Descripción",
  image: "https://via.placeholder.com/300",
  category: "electronics",
  stock: 10,
  tags: ["nuevo", "oferta"]
};

await fetch('http://localhost:3001/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newProduct)
});
```

### Con Axios
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001'
});

// Obtener productos
const products = await api.get('/products');

// Actualizar carrito
await api.put('/cart/1', {
  userId: 1,
  products: [...],
  total: 199.98,
  updatedAt: new Date().toISOString()
});
```