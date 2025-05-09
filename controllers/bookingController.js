const { validationResult } = require('express-validator');
const Booking = require('../models/bookingModel');
const Activity = require('../models/activityModel');

const bookActivity = async (req, res) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { activityId } = req.body;

    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    const existingBooking = await Booking.findOne({
      user: req.user._id,
      activity: activityId,
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'Activity already booked' });
    }

    const booking = await Booking.create({
      user: req.user._id,
      activity: activityId,
    });

    if (booking) {
      res.status(201).json({
        _id: booking._id,
        activity: booking.activity,
        user: booking.user,
        createdAt: booking.createdAt,
      });
    } else {
      res.status(400).json({ message: 'Invalid booking data' });
    }
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('activity');
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  bookActivity,
  getUserBookings,
}; 