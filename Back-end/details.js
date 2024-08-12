const express = require('express');
const path = require('path');
const router = express.Router();
const mysql = require('mysql2');

// Create a MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Chandu@1234',
    database: 'Restora'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

// Create an Express app
const app = express();

// Serve static files from the 'Back-end/img' directory
app.use('/img', express.static(path.join(__dirname, 'img')));

// Handle POST request to /hotel_details
router.post('/hotel_details', (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({
            success: false,
            msg: "ID parameter is required",
        });
    }

    const sql = "SELECT * FROM Hotel WHERE id = ?";
    connection.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({
                success: false,
                msg: "An error occurred while fetching hotel details",
            });
        }

        if (result.length > 0) {
            const hotel = result[0];
            const { id, name, city, state, per_day_price, rating, discount, address, photo_url } = hotel;
            const imageURL = req.protocol + '://' + req.get('host') + '/img/' + path.basename(photo_url); // Ensure '/img' prefix matches static serving path

            res.status(200).json({
                success: true,
                msg: "Hotel Details",
                data: {
                    id,
                    name,
                    city,
                    state,
                    per_day_price,
                    rating,
                    discount,
                    address,
                    photo_url: imageURL
                },
            });
        } else {
            res.status(404).json({
                success: false,
                msg: "No hotel found with the given ID",
            });
        }
    });
});

router.post('/user_details', (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const sql = "SELECT first_name, last_name FROM Customer WHERE id = ?";
    connection.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ success: false, message: "Error fetching user details" });
        }

        if (result.length > 0) {
            res.status(200).json({ success: true, data: { name: result[0].first_name , lname : result[0].last_name} });
        } else {
            res.status(404).json({ success: false, message: "User not found" });
        }
    });
});

module.exports = router;