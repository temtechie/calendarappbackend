const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const userRoutes = require('./routes/userRoute');
const eventRoutes = require('./routes/eventRoute');
const { authenticateToken } = require('./middlewares/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.use(bodyParser.json());
app.use(cors());

// User routes
app.use('/user', userRoutes);

// Event routes (protected by authentication middleware)
app.use('/event', eventRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
