const { authenticate, authorize} = require('../controllers/AuthController');
const { addBook, searchByField } = require('../controllers/bookController');

const router = require('express').Router();

router.post('/addBook', authenticate, authorize("seller"), addBook);

router.post('/searchByField', authenticate, authorize("all"), searchByField);

module.exports = router;