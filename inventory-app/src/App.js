// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ProductList from './components/ProductList';
import WishList from './components/WishList';
import AddProduct from './components/AddProduct';
import Navbar from './components/Navbar';
import EditProduct from './components/EditProduct';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/add" element={ <PrivateRoute><AddProduct /></PrivateRoute>} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/edit/:id" element={<EditProduct />} />
        <Route path="/products/edit/:id" element={<EditProduct />} />

      </Routes>
    </Router>
  );
}

export default App;
