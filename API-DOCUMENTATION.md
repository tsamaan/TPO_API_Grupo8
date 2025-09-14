# API REST - E-commerce Backend

Documentación completa de endpoints disponibles en el servidor Express.

**Base URL**: `http://localhost:3001`
**Health Check**: `GET /health`

---

## 🛍️ Productos

### Obtener todos los productos
```http
GET /products
```

**Respuesta**:
```json
{
  "success": true,
  "message": "Products retrieved successfully",
  "data": [
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
}
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
# Servidor Express (recomendado)
npm run server

# Servidor con auto-reload
npm run server:dev

# JSON Server básico (alternativo)
npm run server:json
```

El servidor estará disponible en `http://localhost:3001`

### Configuración
1. Copia `.env.example` a `.env`
2. Ajusta las variables según tu entorno
3. Instala dependencias: `npm install`
4. Inicia el servidor: `npm run server`

### Endpoints de desarrollo
- **API Base**: `http://localhost:3001`
- **Health Check**: `http://localhost:3001/health`
- **Logs**: Console con Morgan

---

## 📝 Notas Importantes

1. **Responses**: Formato estándar con `success`, `message`, `data`
2. **Error Handling**: Códigos HTTP apropiados y mensajes descriptivos
3. **Validación**: Validación básica de campos requeridos
4. **CORS**: Configurado para desarrollo (puerto 5173)
5. **Logging**: Morgan para logs de requests HTTP
6. **IDs**: Generación automática incremental
7. **Timestamps**: ISO 8601 para fechas
8. **Database**: Archivo JSON con escritura síncrona

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