import { useState, useEffect } from 'react';
import { updateProduct } from '../services/api';
import './EditProductForm.css';

const EditProductForm = ({ product: productToEdit, onProductUpdated, onCancel }) => {
  const [product, setProduct] = useState(productToEdit);

  useEffect(() => {
    setProduct(productToEdit);
  }, [productToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: name === 'tags' ? value.split(',').map(tag => tag.trim()) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(product.id, product);
      alert('Producto actualizado con éxito');
      onProductUpdated();
    } catch (error) {
      alert('Error al actualizar el producto');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h2>Editar Producto</h2>
      
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
        <button type="submit">Guardar Cambios</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
};

export default EditProductForm;