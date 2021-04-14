const Booking = require('../models/bookingModel');
const Book = require('../models/bookModel');
const User = require('../models/userModel');
const { throwError } = require('../utils/Common')
class BookingDAO {
    async createBooking(data) {
        let book = await Book.findById(data['book_id']);
        if (!book) throwError(404, "Book data not found");
        if (book.status == "Booked") throwError(405, "Book alredy booked")
        let buyerQuery = User.findById(data['buyer_id']);
        let sellerQuery = User.findById(book.user);
        let [buyer, seller ] = await Promise.all([buyerQuery, sellerQuery])
        if (!buyer || !seller) throwError(404, "User not found");
        let bookingData = {
            book_id: data['book_id'],
            buyer_id: data['buyer_id'],
            seller_id: book.user,
            number: data['phone_number'],
            address: data['address'],
            status: 'new'
        }
        let [booking, _] = await Promise.all([Booking.create(bookingData), Book.findByIdAndUpdate({_id: book._id}, {status: "Booked"}) ]);
        return booking._id;
    }
}
module.exports = BookingDAO;