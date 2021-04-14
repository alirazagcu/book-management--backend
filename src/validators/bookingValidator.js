const { throwError, validateRequiredFields } = require('../utils/Common');

module.exports = {
    createBooking : (data) => {
        let requiredFields = {
            "book_id": "Book Id",
            "buyer_id": "Buyer Id",
            "phone_number": "Phone Number",
            "address": "Address"
        }
        let requiredData = validateRequiredFields(data, requiredFields);;
        if (requiredData.length > 0){
            throwError(400, "Required data input", requiredData)
        }
    }
}