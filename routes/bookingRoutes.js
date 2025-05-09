const express = require('express');
const { check } = require('express-validator');
const { bookActivity, getUserBookings } = require('../controllers/bookingController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();


router.post(
  '/',
  [
    protect,
    check('activityId', 'Activity ID is required').not().isEmpty(),
  ],
  bookActivity
);


router.get('/', protect, getUserBookings);

module.exports = router; 