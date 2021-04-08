const BookDAO = require('../DAO/bookDAO');
const bookDAO = new BookDAO();
class BookService {
    async addBook(data, file) {
        return await bookDAO.addBook(data, file);
    }

    async searchByField(data) {
        return await bookDAO.searchByField(data);
    }
}

module.exports = BookService;