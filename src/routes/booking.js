const { authenticate, authorize } = require('../controllers/AuthController');
const { createBooking } = require('../controllers/BookingController');

const router = require('express').Router();

router.post('/createBooking', authenticate, authorize("buyer"), createBooking)

module.exports = router;