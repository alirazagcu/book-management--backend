const { validateRequiredFields, throwError } = require('../utils/Common');

module.exports = {
    addBook: (data) => {
        let requiredFields = {
            "book_title": "Book Title",
            "author_name": "Last Name",
            "description": "Description",
          };
          // check required fields
          let requiredData = validateRequiredFields(data, requiredFields);
          if (requiredData.length > 0) {
            throwError(400, "Required data input", requiredData);
          }
    },

    searchByField: (data) => {
        let requiredFields = {
          };
          // check required fields
          let requiredData = validateRequiredFields(data, requiredFields);
          if (requiredData.length > 0) {
            throwError(400, "Required data input", requiredData);
          }
    }
}