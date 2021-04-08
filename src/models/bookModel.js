const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: [40, 'A book title must have less or equal than 40 characters'],
        index: true
    },
    author: {
        type: String,
        required: true,
        index: true
    },
    image: {
        type: String,
        default: 'default.jpeg'
    },
    description: {
        type: String,
        requires: true,
        minLength:[10, 'A book description must have minimum 10 characters'],
        maxLength:[100, 'A book description must have less or  equal than 100 characters'],
        index: true
    },
    keyword: [String],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Book must belong to seller']
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    toJSON: { virtuals: true},
    toObject: { virtuals: true}
})
module.exports = mongoose.model('Book', bookSchema);