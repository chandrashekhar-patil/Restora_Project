const bcrypt = require('bcrypt');
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const session = require("express-session");
const Joi = require('joi');
const router = express.Router();
const app = express();

app.use(bodyParser.json());

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
// Session configuration
// Session configuration
app.use(
    session({
        secret: "1234567890abcdefghijklmnopqrstuvwxyz",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

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

// Login route
router.post('/login', async (req, res) => {
    // Ensure session.login is initialized
    if (!req.session.login) {
        req.session.login = [];
    }

    console.log('Session before validation:', req.session);
    
    const { error } = loginSchema.validate(req.body);
    if (error) {
        console.log('Validation error:', error.details[0].message);
        req.session.login.push({ success: false, message: error.details[0].message });
        return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;

    const checkQuery = 'SELECT * FROM Customer WHERE email = ?';
    connection.query(checkQuery, [email], async (err, results) => {
        if (err) {
            req.session.login.push({ success: false, message: 'Database error' });
            console.error('Error checking for existing user:', err);
            return res.status(500).json({ message: 'Error checking for existing user', error: err.message });
        }

        if (results.length === 0) {
            req.session.login.push({ success: false, message: 'Invalid email or password' });
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            req.session.login.push({ success: false, message: 'Invalid email or password' });
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        req.session.userId = user.id;
        req.session.login.push({ success: true, message: 'Login successful' });

        console.log('Session after successful login:', req.session);

        res.json({
            message: 'Login successful!',
            user: {
                success: true,
                id: user.id,
                email: user.email,
            }
        });
    });
});

module.exports = router;