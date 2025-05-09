const mongoose = require('mongoose');

const activitySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Activity title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Activity description is required'],
      trim: true
    },
    location: {
      type: String,
      required: [true, 'Activity location is required'],
      trim: true
    },
    dateTime: {
      type: Date,
      required: [true, 'Date and time are required']
    }
  },
  {
    timestamps: true
  }
);

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity; 