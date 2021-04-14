const requestValidator = require('../validators/bookingValidator')
const BookingService = require('../services/bookingService');
const bookingService = new BookingService();

module.exports = {
    createBooking: async (req, res, next) => {
        try {
            requestValidator.createBooking(req.body);
            let booking = await bookingService.createBooking(req.body);
            return res.json({success: true, booking: booking});
        } catch (e) {
            next(e);
        }
    }
}