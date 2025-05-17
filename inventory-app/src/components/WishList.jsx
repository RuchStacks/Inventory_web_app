import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../components/AuthContext';

const WishList = () => {
  const { authToken } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axios.get('http://localhost:5000/wishlist', {
          headers: { Authorization: `Bearer ${authToken}` }
        });
        setWishlist(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
          alert('Please log in to view your wishlist');
          return window.location.href = '/login';
        }
        console.error(err);
      }
    };
    fetchWishlist();
  }, [authToken]);

  const handleRemove = async (wish_id) => {
    try {
      await axios.delete(`http://localhost:5000/wishlist/${wish_id}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      setWishlist(wishlist.filter(w => w.wish_id !== wish_id));
    } catch (err) {
      alert('Failed to remove item');
    }
  };

  return (
    <div className="container mt-4">
      <h2>My Wishlist</h2>
      {!wishlist.length
        ? <p>No items in your wishlist.</p>
        : <div className="row">
            {wishlist.map(w => (
              <div className="col-md-4 mb-3" key={w.wish_id}>
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h5>{w.name}</h5>
                    <p>₹{w.price}</p>
                    <p>Category: {w.category}</p>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemove(w.wish_id)}
                    >
                      <i className="bi bi-trash me-2" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
      }
    </div>
  );
};

export default WishList;
