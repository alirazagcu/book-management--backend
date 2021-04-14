const BookingDAO = require('../DAO/bookingDAO');
const bookingDAO = new BookingDAO();
class BookingService {
    async createBooking(data){
        return await bookingDAO.createBooking(data)
    }
}

module.exports = BookingService;