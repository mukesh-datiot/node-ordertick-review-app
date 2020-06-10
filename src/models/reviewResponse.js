const mongoose = require('mongoose')
const validator = require('validator')

const reviewResponseSchema = new mongoose.Schema({
    reviewId: {
        type: String
    },
    reviewResponse: {
        type: String
    },
    userId: {
        type: String
    }

}, {
    timestamps: true
})

const ReviewResponse = mongoose.model('ReviewResponse', reviewResponseSchema)

module.exports = ReviewResponse