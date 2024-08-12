const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const router = express.Router();

const app = express();
// Create a connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Chandu@1234',
    database: 'Restora'
});

router.use(bodyParser.json());

// API endpoint to insert booking
router.post('/insert_booking', (req, res) => {
    const { hotelId, userId, noOfNights, noOfPeople, checkIn, checkOut, payment_status } = req.body;

    const query = `
        INSERT INTO Hotel_Booking (hotel_id, customer_id, no_of_nights, no_of_people, check_in, check_out, payment_status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    pool.query(query, [hotelId, userId, noOfNights, noOfPeople, checkIn, checkOut, payment_status], (error, results) => {
        if (error) {
            console.error('Error inserting booking:', error);
            return res.json({ success: false });
        }
        res.json({ success: true });
    });
});

module.exports = router;