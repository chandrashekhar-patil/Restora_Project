const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();

app.use(bodyParser.json());


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

// API to log a visit to a hotel
router.post('/visit', (req, res) => {
    const { hotel_id, customer_id } = req.body;

    if (!hotel_id || !customer_id) {
        return res.status(400).json({ message: 'Hotel ID and Customer ID are required' });
    }

    const query = 'INSERT INTO Visit (hotel_id, customer_id, visit_date) VALUES (?, ?, NOW())';
    connection.query(query, [hotel_id, customer_id], (err, results) => {
        if (err) {
            console.error('Error logging visit:', err);
            return res.status(500).json({ message: 'Error logging visit', error: err.message });
        }
        res.json({ message: 'Visit', visitId: results.insertId });
    });
});

module.exports = router;