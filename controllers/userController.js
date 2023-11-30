const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const registerUser = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({
            fullname,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        await user.save();

        return res.status(201).json({ message: 'User registered successfully', data: user });
    } catch (error) {
        console.error('Error registering user:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email and check the password
        const user = await User.findByCredentials(email, password);

        // Generate JWT token and send it in the response
        const token = user.generateAuthToken();

        return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in:', error.message);
        return res.status(401).json({ error: 'Invalid login credentials' });
    }
};

module.exports = { registerUser, loginUser };
