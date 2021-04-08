const Book = require('../models/bookModel');
const User = require('../models/userModel');
const { throwError, capitalizeEachWord } = require('../utils/Common');
class BookDAO {

    async addBook(data, file) {
        data['book_title'] = data['book_title'].trim();
        let keyword = data['book_title'].split(' ');
        try {
            const user = await User.findById(data._user.id)
            const newBook =  await Book.create({
                title: capitalizeEachWord(data['book_title']),
                author: capitalizeEachWord(data['author_name']),
                description: data['description'],
                keyword: keyword,
                image: file.originalname,
                user: user._id
            })
            if (newBook) return "Book successfully added"
        } catch (e) {
            throwError(e.statusCode, e)
        }
    }

    async searchByField(data) {
        const regex = new RegExp(this.escapeRegex(data['search']), 'gi');
        try {
            let query = null;
            if (data['field'] == 'title') query = Book.find({title: regex})
            else if (data['field'] == 'author') query = Book.find({author: regex})
            else query = Book.find({});
            const books = await query;
            return books;
            
        } catch (e) {
            throwError(e.statusCode, e);
        }
    }

    escapeRegex(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    };
}

module.exports = BookDAO;