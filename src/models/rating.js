const mongoose = require('mongoose')
const validator = require('validator')

const ratingSchema = new mongoose.Schema({
    expertId: {
        type: String
    },
    userId: {
        type: String
    },
    feedbackRating: {
        type: Number,
        default: 0,
        validate(value) {
            if (value >= 6) {
                throw new Error('Rating number is greater than five')
            } else if(value < 1){
                throw new Error('Rating number should be greter than 0')
            }
        }
    },
    feedbackDetails: {
        type: String
    }

}, {
    timestamps: true
})

const Rating = mongoose.model('Rating', ratingSchema)

module.exports = Rating