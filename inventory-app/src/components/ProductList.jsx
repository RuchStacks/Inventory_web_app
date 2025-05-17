import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { authToken }   = useContext(AuthContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  const handleAddToWishlist = async (productId) => {
    try {
      await axios.post(
        'http://localhost:5000/wishlist',
        { product_id: productId },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      alert('Added to wishlist');
    } catch (err) {
      alert(err.response?.data.error || 'Failed to add');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Product Inventory</h2>
      <table className="table table-bordered table-hover text-center">
        <thead className="table-dark">
          <tr>
            <th>Name</th><th>Description</th><th>Quantity</th>
            <th>Price (₹)</th><th>Category</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.category}</td>
              <td>
                <Link to={`/products/edit/${item.id}`}>
                  <button className="btn btn-primary btn-sm me-2">Edit</button>
                </Link>
                <button
                  className="btn btn-danger btn-sm me-2"
                  onClick={() => handleDelete(item.id)}
                >Delete</button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleAddToWishlist(item.id)}
                >
                  <i className="bi bi-heart"></i> Wishlist
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
