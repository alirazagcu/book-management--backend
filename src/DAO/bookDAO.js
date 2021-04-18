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
                user: user._id,
                category: data['category']
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
            else if (data['field'] == "category") query = Book.find({category: regex})
            else if (data['field'] == "keyword") query = Book.find({keyword: regex})
            else query = Book.find({});
            const books = await query;
            return books;
            
        } catch (e) {
            throwError(e.statusCode, e);
        }
    }

    async deleteBook(data) {
        const book = await Book.findOne({_id: data['book_id'], user: data._user.id});
        if (!book) throwError(404, "Book not found")
        let doc = await Book.deleteOne({_id:book._id});
        if(!doc) throwError(404, "Error while deleting book")
        return;
    }

    async updateBookStatus(data) {
        const book = await Book.findOne({_id: data['book_id']});
        if (!book) throwError(404, "Book not found");
        if (book.status === "sold") throwError(404, "Book already sold");
        if (book.status === data['status']) throwError(404, "book alredy updated");
        let doc = await Book.updateOne({_id: book._id},{status: data['status']},{new: true, runValidators: true});
        if (!doc) throwError(404, "Book status not updated");
        return;
    }

    escapeRegex(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    };
}

module.exports = BookDAO;