const express = require('express');
const bodyParser = require('body-parser');
const session = require("express-session");
const cors = require('cors'); // Import the cors module
const detailsRoutes = require('./details');
const forgetRoutes = require('./forget');
const loginRoutes = require('./register');
const searchRoutes = require('./search');
const visitRoutes = require('./visit');
const bookingRouter = require('./booking');
const inRouter = require('./login');
const completebookRouter = require('./completebook');
const path = require('path');


const app = express();
app.use(
    session({
      secret: "1234567890abcdefghijklmnopqrstuvwxyz",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false },
    })
  );
// Joi

app.use('/img', express.static(path.join(__dirname, '/img')));

// Enable CORS for all routes
app.use(cors({
    origin: 'http://127.0.0.1:5501',
    credentials: true
}));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

// Use routes
app.use(forgetRoutes);
app.use(inRouter);
app.use(detailsRoutes);
app.use(loginRoutes);
app.use(searchRoutes);
app.use(visitRoutes);
app.use(bookingRouter);
app.use(completebookRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const port = 3000;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});