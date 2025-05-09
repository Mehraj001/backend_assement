const { validationResult } = require('express-validator');
const Activity = require('../models/activityModel');

const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find({});
    res.json(activities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getActivityById = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (activity) {
      res.json(activity);
    } else {
      res.status(404).json({ message: 'Activity not found' });
    }
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

const createActivity = async (req, res) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, location, dateTime } = req.body;

    const activity = await Activity.create({
      title,
      description,
      location,
      dateTime,
    });

    res.status(201).json(activity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getActivities,
  getActivityById,
  createActivity,
}; 