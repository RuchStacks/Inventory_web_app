// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/products">InventoryApp</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link mx-4" to="/products">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link mx-4" to="/add">Add Product</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link mx-4" to="/wishlist">
              <i className="bi bi-heart-fill me-1 text-danger"></i>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link mx-2" to="/">
              <i className="bi bi-box-arrow-right me-1 text-warning"></i> 
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
