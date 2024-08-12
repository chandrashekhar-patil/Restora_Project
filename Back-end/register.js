const express = require('express');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const router = express.Router();
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// Create a connection to the database
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
const registrationSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": "Name is required.",
        "string.empty": "Name cannot be empty.",
    }),
    email: Joi.string().email().required().messages({
        "any.required": "Email is required.",
        "string.email": "Invalid email format.",
    }),
    password: Joi.string().min(4).required().messages({
        "any.required": "Password is required.",
        "string.min": "Password must be at least 4 characters long.",
    }),
    lastName: Joi.string().required().messages({
        "any.required": "Name is required.",
        "string.empty": "Name cannot be empty.",
    }),
    phone: Joi.string().optional()
});

// Joi schema for user login validation
const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "any.required": "Email is required.",
        "string.email": "Invalid email format.",
    }),
    password: Joi.string().min(4).required().messages({
        "any.required": "Password is required.",
        "string.min": "Password must be at least 4 characters long.",
    })
});

// User registration route
router.post('/register', async (req, res) => {
    // Validate the request body against the schema
    const { error } = registrationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { name, email, password, lastName, phone } = req.body;

    // Check if the email already exists in the database
    const checkQuery = 'SELECT * FROM Customer WHERE email = ?';
    connection.query(checkQuery, [email], async (err, results) => {
        if (err) {
            console.error('Error checking for existing user:', err);
            return res.status(500).json({ message: 'Error checking for existing user', error: err.message });
        }

        if (results.length > 0) {
            // User with the same email already exists
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        const insertQuery = 'INSERT INTO Customer (first_name, last_name, phone, email, password) VALUES (?, ?, ?, ?, ?)';
        connection.query(insertQuery, [name, lastName || null, phone || null, email, hashedPassword], (err, results) => {
            if (err) {
                console.error('Error inserting user:', err);
                return res.status(500).json({ message: 'Error registering user', error: err.message });
            }
            res.json({ message: 'Registration successful!', userId: results.insertId, email: email });
        });
    });
});
module.exports = router;
