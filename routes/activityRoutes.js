const express = require('express');
const { check } = require('express-validator');
const { getActivities, getActivityById, createActivity } = require('../controllers/activityController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();


router.get('/', getActivities);


router.get('/:id', getActivityById);


router.post(
  '/',
  [
    protect,
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('location', 'Location is required').not().isEmpty(),
    check('dateTime', 'Date and time are required').not().isEmpty(),
  ],
  createActivity
);

module.exports = router; 