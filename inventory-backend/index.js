// index.js
// at top of index.js
const verifyToken = require('./middleware/verifyToken');

const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

// Config
const connection = require('./config/db');

// Middleware
app.use(cors()); // React ko access dena
app.use(express.json()); // JSON data handle karega
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Static files serve

// middleware/verifyToken.js
const jwt = require('jsonwebtoken');


// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);


// Routes
app.get('/', (req, res) => {
    res.json({ message: 'API running successfully' });
});

// Sample: Get all products
app.get('/products', async (req, res) => {
    try {
        const [data] = await connection.execute('SELECT * FROM products');
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});





app.get('/products/:id', async (req, res) => {
  try {
    const [result] = await connection.execute("SELECT * FROM products WHERE id = ?", [req.params.id]);
    res.json(result[0]); // return single object
  } catch (err) {
    res.status(500).json({ error: "Product not found" });
  }
});

// index.js ya routes file mein
app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, quantity, price, category } = req.body;

  try {
    const sql = `UPDATE products SET name = ?, description = ?, quantity = ?, price = ?, category = ? WHERE id = ?`;
    await connection.execute(sql, [name, description, quantity, price, category, id]);
    res.json({ message: 'Product updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Update failed' });
  }
});




// Sample: Add product
app.post('/products', async (req, res) => {
  try {
    const { name, description, quantity, price, category } = req.body;

    const sql = `INSERT INTO products (name,  description, quantity, price,category) VALUES (?, ?, ?, ?, ?)`;

    const [result] = await connection.execute(sql, [
      name, description, quantity, price, category
    ]);

    res.status(201).json({ message: "Product added successfully", productId: result.insertId });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add product" });
  }
});


// DELETE a product
app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sql = `DELETE FROM products WHERE id = ?`;
    await connection.execute(sql, [id]);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete product" });
  }
});



// Require JWT middleware (we’ll add it later)

// 1) Add to wishlist
app.post(
  '/wishlist',
  verifyToken,
  async (req, res) => {
    const { product_id } = req.body;
    const user_id = req.user.id;
    try {
      // Prevent duplicates
      const [exists] = await connection.execute(
        'SELECT * FROM wishlist WHERE user_id = ? AND product_id = ?',
        [user_id, product_id]
      );
      if (exists.length) {
        return res.status(400).json({ error: 'Already in wishlist' });
      }
      await connection.execute(
        'INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)',
        [user_id, product_id]
      );
      res.status(201).json({ message: 'Added to wishlist' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to add' });
    }
  }
);

// 2) Get current user’s wishlist
app.get(
  '/wishlist',
  verifyToken,
  async (req, res) => {
    const user_id = req.user.id;
    try {
      const [rows] = await connection.execute(
        `SELECT w.id AS wish_id,
                p.id AS product_id,
                p.name, p.description, p.quantity, p.price, p.category
         FROM wishlist w
         JOIN products p ON w.product_id = p.id
         WHERE w.user_id = ?`,
        [user_id]
      );
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch wishlist' });
    }
  }
);

// 3) Remove from wishlist
app.delete(
  '/wishlist/:wish_id',
  verifyToken,
  async (req, res) => {
    const { wish_id } = req.params;
    try {
      await connection.execute(
        'DELETE FROM wishlist WHERE id = ?',
        [wish_id]
      );
      res.json({ message: 'Removed from wishlist' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to remove' });
    }
  }
);

module.exports = function (req, res, next) {
  // Expect header “Authorization: Bearer <token>”
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};


//wislist
// 1) Add to wishlist
app.post(
  '/wishlist',
  verifyToken,
  async (req, res) => {
    const { product_id } = req.body;
    const user_id = req.user.id;

    try {
      // Prevent duplicates
      const [exists] = await connection.execute(
        'SELECT 1 FROM wishlist WHERE user_id = ? AND product_id = ?',
        [user_id, product_id]
      );
      if (exists.length) {
        return res.status(400).json({ error: 'Already in wishlist' });
      }

      // Insert into wishlist
      await connection.execute(
        'INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)',
        [user_id, product_id]
      );
      res.status(201).json({ message: 'Added to wishlist' });

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to add to wishlist' });
    }
  }
);

// 2) Get current user’s wishlist
app.get(
  '/wishlist',
  verifyToken,
  async (req, res) => {
    const user_id = req.user.id;

    try {
      const [rows] = await connection.execute(
        `SELECT 
           w.id   AS wish_id,
           p.id   AS product_id,
           p.name, p.description, p.quantity, p.price, p.category
         FROM wishlist w
         JOIN products p ON w.product_id = p.id
         WHERE w.user_id = ?`,
        [user_id]
      );
      res.json(rows);

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch wishlist' });
    }
  }
);

// 3) Remove from wishlist
app.delete(
  '/wishlist/:wish_id',
  verifyToken,
  async (req, res) => {
    const { wish_id } = req.params;

    try {
      await connection.execute(
        'DELETE FROM wishlist WHERE id = ?',
        [wish_id]
      );
      res.json({ message: 'Removed from wishlist' });

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to remove from wishlist' });
    }
  }
);




const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
