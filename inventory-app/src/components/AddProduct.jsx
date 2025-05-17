import { useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';


const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    quantity: '',
    price: '',
    category: ''
  });

const navigate = useNavigate();   

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/products', product);
      console.log('Product added:', response.data);

      setProduct({
        name: '',
        description: '',
        quantity: '',
        price: '',
        category: ''
      });

      alert('Product added successfully!');
        navigate('/products');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Add New Product</h2>
      <form className="border p-4 rounded shadow" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            value={product.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Quantity</label>
          <input
            type="number"
            name="quantity"
            className="form-control"
            value={product.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price (₹)</label>
          <input
            type="number"
            name="price"
            className="form-control"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Category</label>
          <input
            type="text"
            name="category"
            className="form-control"
            value={product.category}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-success w-100">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
