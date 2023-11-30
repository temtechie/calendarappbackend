// const express = require('express');
// const userController = require('../controllers/userController');

// const router = express.Router();

// // Register a new user
// router.post('/register', userController.registerUser);

// module.exports = router;


// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Register a new user
router.post('/register', userController.registerUser);

// Login
router.post('/login', userController.loginUser);

module.exports = router;

