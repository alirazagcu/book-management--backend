const multer = require('multer')
const requestValidator = require('../validators/bookValidator')
const imageUpload= require('../config/imageUpload').single('image');
const BookService = require('../services/bookService');
const bookService = new BookService();

module.exports = {

    addBook: async(req, res, next) => {
        const _user = req.body._user;
        imageUpload(req, res, async (err) => {
            try {
                if (err instanceof multer.MulterError) {
                    // image too large
                    throwError(413, err.message);
                  } else if (err) {
                    // Unsupported image type
                    throwError(415, err.message);
                  }
                requestValidator.addBook(req.body);
                req.body._user = _user;
                let response = await bookService.addBook(req.body, req.file);
                return res.json({success: true, response: response});
            } catch (e) {
                next(e);
            }
        })
    },

    searchByField: async(req, res, next) => {
        try {
            requestValidator.searchByField(req.body);
            let response = await bookService.searchByField(req.body);
            return res.json({success: true, response: response});
        } catch (e) {
            next(e);
        }
    }
}