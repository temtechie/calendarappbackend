const express = require('express');
const eventController = require('../controllers/eventController');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Create a new event
router.post('/create', authenticateToken, eventController.createEvent);

// Read all events for the authenticated user
router.get('/all', authenticateToken, eventController.getAllEvents);

// Read a single event
router.get('/:id', authenticateToken, eventController.getEvent);

// Edit an event
router.put('/:id', authenticateToken, eventController.editEvent);

// Delete an event
router.delete('/:id', authenticateToken, eventController.deleteEvent);

module.exports = router;
