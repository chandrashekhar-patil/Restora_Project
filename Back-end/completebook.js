const express = require('express');
const mysql = require('mysql2');
const router = express.Router(); // Define router here

// Create a connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Chandu@1234',
    database: 'Restora'
});

// API endpoint to complete booking
router.post('/complete_booking', (req, res) => {
    const { hotel_id, customer_id, upi_id } = req.body;

    // Log the received data for debugging
    console.log('Received data:', { hotel_id, customer_id, upi_id });

    if (!hotel_id || !customer_id || !upi_id) {
        return res.status(400).json({ success: false, message: 'Missing required fields.' });
    }

    // Update booking status to 'Completed'
    const query = `
        UPDATE Hotel_Booking
        SET payment_status = 'Completed'
        WHERE hotel_id = ? AND customer_id = ? AND payment_status = 'Pending'
    `;

    pool.query(query, [hotel_id, customer_id], (error, results) => {
        if (error) {
            console.error('Error updating booking:', error);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }

        // Check if any rows were affected
        if (results.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Booking not found or already completed.' });
        }

        res.json({ success: true });
    });
});

module.exports = router; // Export router