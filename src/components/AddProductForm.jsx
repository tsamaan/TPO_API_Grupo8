import { useState, useEffect } from 'react';
import { createProduct } from '../services/api';
import './AddProductForm.css';

const AddProductForm = ({ onProductAdded }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    image: '',
    stock: 0,
    price: 0,
    category: '',
    tags: []
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const validate = () => {
      const newErrors = {};
      if (!product.name) newErrors.name = 'El nombre es obligatorio.';
      if (!product.description) newErrors.description = 'La descripción es obligatoria.';
      if (product.stock < 0) newErrors.stock = 'El stock no puede ser negativo.';
      if (product.price <= 0) newErrors.price = 'El precio debe ser mayor que cero.';
      if (!product.category) newErrors.category = 'La categoría es obligatoria.';
      if (!product.image) newErrors.image = 'Debe agregar al menos una imagen.';
      
      setErrors(newErrors);
    };

    validate();
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: name === 'tags' ? value.split(',').map(tag => tag.trim()) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      try {
        await createProduct(product);
        alert('Producto creado con éxito');
        if(onProductAdded) onProductAdded();
        setProduct({
          name: '',
          description: '',
          image: '',
          stock: 0,
          price: 0,
          category: '',
          tags: []
        });
      } catch (error) {
        alert('Error al crear el producto');
        console.error(error);
      }
    } else {
      alert('Por favor, corrija los errores en el formulario.');
    }
  };
  
  const getButtonTitle = () => {
    if (Object.keys(errors).length === 0) {
      return '';
    }
    return Object.values(errors).join('\n');
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h2>Alta de Producto</h2>

      <div className="form-group">
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          value={product.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          name="description"
          value={product.description}
          onChange={handleChange}
        />
        {errors.description && <p className="error">{errors.description}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="image">Imagen (URL)</label>
        <input
          type="text"
          id="image"
          name="image"
          value={product.image}
          onChange={handleChange}
        />
        {errors.image && <p className="error">{errors.image}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="stock">Stock</label>
        <input
          type="number"
          id="stock"
          name="stock"
          value={product.stock}
          onChange={handleChange}
        />
        {errors.stock && <p className="error">{errors.stock}</p>}
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
        />
        {errors.price && <p className="error">{errors.price}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="category">Categoría</label>
        <input
          type="text"
          id="category"
          name="category"
          value={product.category}
          onChange={handleChange}
        />
        {errors.category && <p className="error">{errors.category}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="tags">Tags (separados por comas)</label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={Array.isArray(product.tags) ? product.tags.join(', ') : ''}
          onChange={handleChange}
        />
      </div>

      <div className="form-actions">
        <button 
          type="submit" 
          disabled={Object.keys(errors).length > 0}
          title={getButtonTitle()}
        >
          Crear Producto
        </button>
      </div>
    </form>
  );
};

export default AddProductForm;