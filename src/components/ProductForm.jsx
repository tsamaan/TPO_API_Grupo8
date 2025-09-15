import { useState } from 'react';
import './ProductForm.css';

const ProductForm = () => {
  const [product, setProduct] = useState({
    id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef', // ID de ejemplo
    name: 'Producto de Ejemplo',
    description: 'Esta es una descripción para el producto de ejemplo.',
    images: [],
    stock: 100,
    price: 99.99,
    tags: ['ejemplo', 'producto'],
    category: 'Ejemplos'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: name === 'tags' ? value.split(',').map(tag => tag.trim()) : value
    }));
  };

  const handleImageChange = (e) => {
    setProduct(prevProduct => ({
      ...prevProduct,
      images: [...e.target.files]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del producto enviados:', product);
    alert('Datos del producto enviados. Revisa la consola.');
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h2>Formulario de Producto</h2>
      
      <div className="form-group">
        <label htmlFor="id">ID del Producto</label>
        <input
          type="text"
          id="id"
          name="id"
          value={product.id}
          disabled
        />
      </div>

      <div className="form-group">
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          name="description"
          value={product.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="images">Imágenes</label>
        <input
          type="file"
          id="images"
          name="images"
          onChange={handleImageChange}
          multiple
        />
      </div>

      <div className="form-group">
        <label htmlFor="stock">Stock</label>
        <input
          type="number"
          id="stock"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="price">Precio</label>
        <input
          type="number"
          id="price"
          name="price"
          value={product.price}
          onChange={handleChange}
          step="0.01"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="tags">Tags (separados por comas)</label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={product.tags.join(', ')}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Categoría</label>
        <input
          type="text"
          id="category"
          name="category"
          value={product.category}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-actions">
        <button type="submit">Guardar Producto</button>
        <button type="button">Eliminar</button>
      </div>
    </form>
  );
};

export default ProductForm;
