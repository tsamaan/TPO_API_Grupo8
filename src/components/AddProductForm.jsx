import { useState, useEffect } from 'react';

const AddProductForm = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    images: [],
    stock: 0,
    price: 0,
    tags: [],
    category: ''
  });

  const [imageUrl, setImageUrl] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const validate = () => {
      const newErrors = {};
      if (!product.name) newErrors.name = 'El nombre es obligatorio.';
      if (!product.description) newErrors.description = 'La descripción es obligatoria.';
      if (product.stock < 0) newErrors.stock = 'El stock no puede ser negativo.';
      if (product.price <= 0) newErrors.price = 'El precio debe ser mayor que cero.';
      if (!product.category) newErrors.category = 'La categoría es obligatoria.';
      if (product.images.length === 0) newErrors.images = 'Debe agregar al menos una imagen.';
      
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

  const handleImageChange = (e) => {
    setProduct(prevProduct => ({
      ...prevProduct,
      images: [...prevProduct.images, ...e.target.files]
    }));
  };

  const handleAddImageUrl = () => {
    if (imageUrl.trim() !== '') {
      setProduct(prevProduct => ({
        ...prevProduct,
        images: [...prevProduct.images, imageUrl.trim()]
      }));
      setImageUrl('');
    }
  };

  const handleRemoveImage = (index) => {
    setProduct(prevProduct => ({
      ...prevProduct,
      images: prevProduct.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      console.log('Datos del nuevo producto:', product);
      alert('Producto creado. Revisa la consola.');
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
        <label htmlFor="images">Imágenes</label>
        <input
          type="file"
          id="images"
          name="images"
          onChange={handleImageChange}
          multiple
        />
        <div className="image-url-group">
          <input
            type="text"
            placeholder="O ingrese una URL de imagen"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <button type="button" onClick={handleAddImageUrl}>Agregar URL</button>
        </div>
        {errors.images && <p className="error">{errors.images}</p>}
        <div className="image-preview">
          {product.images.map((image, index) => (
            <div key={index} className="image-item">
              <img src={typeof image === 'string' ? image : URL.createObjectURL(image)} alt={`preview ${index}`} />
              <button type="button" onClick={() => handleRemoveImage(index)}>X</button>
            </div>
          ))}
        </div>
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
        />
        {errors.category && <p className="error">{errors.category}</p>}
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