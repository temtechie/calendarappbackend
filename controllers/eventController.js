const Event = require('../models/eventModel');

const createEvent = async (req, res) => {
    const { title, start, end, description } = req.body;

    console.log("req.body", req.body);

    if (!title || !start || !end) {
        return res.status(400).json({ message: 'Bad request provide payload' });
    }
    try {
        // Create a new event with the user ID
        const event = new Event({
            title,
            start,
            end,
            description,
            userId: req.user._id,
        });

        await event.save();

        return res.status(201).json({ message: 'Event created successfully', data: event });
    } catch (error) {
        console.error('Error creating event:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const getAllEvents = async (req, res) => {

    if (!req.user._id) {
        return res.status(400).json({ error: 'No User found!' });
    }
    try {
        // Fetch all events for the authenticated user
        const events = await Event.find({ userId: req.user._id });

        return res.status(200).json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const getEvent = async (req, res) => {
    try {
        const eventId = req.params.id;

        // Fetch a single event for the authenticated user
        const event = await Event.findOne({ _id: eventId, userId: req.user._id });

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        return res.status(200).json(event);
    } catch (error) {
        console.error('Error fetching event:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const getEventsByStart = async (req, res) => {
    try {
        const { start } = req.query;
        const events = await Event.find({ userId: req.user._id, start });
        return res.status(200).json(events);
    } catch (error) {
        console.error('Error fetching events by start:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


const editEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const { title, start, end, description } = req.body;

        // Update the event for the authenticated user
        const updatedEvent = await Event.findOneAndUpdate(
            { _id: eventId, userId: req.user._id },
            { title, start, end, description },
            { new: true } // Return the updated document
        );

        if (!updatedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }

        return res.status(200).json({ message: 'Event updated successfully', updatedEvent });
    } catch (error) {
        console.error('Error updating event:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.id;

        // Delete the event for the authenticated user
        const deletedEvent = await Event.findOneAndDelete({ _id: eventId, userId: req.user._id });

        if (!deletedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }

        return res.status(200).json({ message: 'Event deleted successfully', deletedEvent });
    } catch (error) {
        console.error('Error deleting event:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { createEvent, getAllEvents, getEvent, editEvent, deleteEvent, getEventsByStart };
