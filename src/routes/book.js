const { authenticate, authorize} = require('../controllers/AuthController');
const { addBook, searchByField, deleteBook, updateBookStatus } = require('../controllers/bookController');

const router = require('express').Router();

router.post('/addBook', authenticate, authorize("seller"), addBook);

router.post('/searchByField', authenticate, authorize("all"), searchByField);

router.post('/deleteBook', authenticate, authorize("seller"), deleteBook);

router.post('/updateBookStatus', authenticate, authorize("all"), updateBookStatus);

module.exports = router;