const Book = require('../models/bookModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const Notification = require('../models/notificationModel');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const { throwError, capitalizeEachWord } = require('../utils/Common');
const {accessKeyId, secretAccessKey, region, bucket_name} = require('../config/credentials')

class BookDAO {

    async addBook(data, file) {
        try {
            let myfile = file.originalname.split('.');
            let fileType = myfile[myfile.length -1];
            const s3 = new AWS.S3({
                accessKeyId,
                secretAccessKey,
                region
            });
    
            const params = {
                Bucket: bucket_name,
                Key :`${uuidv4()}.${fileType}`,
                Body: file.buffer,
                acl: 'public-read'
            };
            const imageData = await s3.upload(params).promise();
            if (!imageData) throwError(404, "Image upload failed");
            data['book_title'] = data['book_title'].trim();
            let keyword = data['book_title'].split(' ');
            const user = await User.findById(data._user.id)
            const newBook =  await Book.create({
                title: capitalizeEachWord(data['book_title']),
                author: capitalizeEachWord(data['author_name']),
                description: data['description'],
                keyword: keyword,
                image: imageData.Location,
                category: data['category'],
                price: parseInt(data['book_price']),
                condition: data['general_condition'],
                user: user._id,
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
            if (data['book_condition']) {
                if (data['field'] == 'title') query = Book.find({title: regex}).where({status: 'new', condition: data['book_condition']})
                else if (data['field'] == 'author') query = Book.find({author: regex}).where({status: 'new', condition: data['book_condition']})
                else if (data['field'] == "category") query = Book.find({category: regex}).where({status: 'new', condition: data['book_condition']})
                else if (data['field'] == "keyword") query = Book.find({keyword: regex}).where({status: 'new', condition: data['book_condition']})
                else query = Book.find({}).where({status: 'new', condition: data['book_condition']});
            }
            else {
                if (data['field'] == 'title') query = Book.find({title: regex}).where({status: 'new'})
                else if (data['field'] == 'author') query = Book.find({author: regex}).where({status: 'new'})
                else if (data['field'] == "category") query = Book.find({category: regex}).where({status: 'new'})
                else if (data['field'] == "keyword") query = Book.find({keyword: regex}).where({status: 'new'})
                else query = Book.find({}).where({status: 'new'});
            }
            const books = await query;
            return books;
            
        } catch (e) {
            throwError(e.statusCode, e);
        }
    }

    async deleteBook(data) {
        const book = await Book.findOne({_id: data['book_id'], user: data._user.id});
        if (!book) throwError(404, "Book not found")
        const booking = await Booking.findOne({book_id: book._id});
        if (booking && book) {
         await Promise.all([Book.deleteOne({_id:book._id}), Booking.deleteOne({_id: booking._id}), Notification.findOneAndDelete({booking_id:booking._id})])
        }
        else await Book.deleteOne({_id:book._id})
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

    async getAllBooksByUser(data) {
        const user = await User.findById(data._user.id);
        if (!user) throwError(404, "User not found")
        // const books = await Book.find({user: data._user.id}).where({status: {$ne: "sold"}});
        const books = await Book.find({user: data._user.id}).sort({'updated_at': -1});
        if (books.length > 0) {
            return books.map(book => {
                return { 
                    id: book._id,
                    book_name: book.title,
                    author_name: book.author,
                    book_price: book.price || 0,
                    status: book.status,
                    updated_date: book.updated_at,
                    created_date: book.created_at
                }
            })
        }
    }

    escapeRegex(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    };
}

module.exports = BookDAO;