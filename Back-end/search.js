const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const cors = require('cors'); // Import CORS
const app = express();
const router = express.Router();

// Use CORS
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from the 'img' directory
app.use('/img', express.static(path.join(__dirname, 'img')));

// Middleware to parse JSON request bodies
app.use(express.json());

// Create a connection to the database
require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Chandu@1234',
    database: 'Restora'
});


// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

// Function to parse the search term for price range
function parsePriceRange(searchTerm) {
    const match = searchTerm.match(/under\s+(\d+)\s+rs/i);
    if (match) {
        return { maxPrice: parseFloat(match[1]) };
    }
    return {};
}

// Search hotels route
router.post('/search', (req, res) => {
    const { search } = req.body;

    if (!search) {
        return res.status(400).json({ message: 'Search term is required' });
    }

    const { maxPrice } = parsePriceRange(search);

    // Build the query to search based on the search term and optional price range
    let query = `
        SELECT id, name, city, state, per_day_price, rating, discount, address
        FROM Hotel
        WHERE name LIKE ? OR city LIKE ? OR state LIKE ? OR address LIKE ?
    `;
    const params = [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`];

    if (maxPrice != null) {
        query += ' AND per_day_price <= ?';
        params.push(maxPrice);
    }

    // Print the query and parameters for debugging
    console.log('SQL Query:', query);
    console.log('Query Parameters:', params);

    // Execute the query
    connection.query(query, params, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ message: 'Error searching for hotels', error: err.message });
        }

        // Return results without the photo_url
        res.json(results);
    });
});

// Search suggestions route
// Search suggestions route
router.get('/suggestions', (req, res) => {
    const { term } = req.query;

    if (!term) {
        return res.status(400).json({ message: 'Search term is required' });
    }

    // Query for search suggestions
    const query = `
        SELECT DISTINCT name
        FROM Hotel
        WHERE name LIKE ?
    `;
    const params = [`%${term}%`];

    // Execute the query
    connection.query(query, params, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ message: 'Error fetching suggestions', error: err.message });
        }

        // Extract and return the names for suggestions
        const suggestions = results.map(result => result.name);
        res.json(suggestions);
    });
});


module.exports = router;