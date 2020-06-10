const mongoose = require('mongoose')
const validator = require('validator')

const reviewSchema = new mongoose.Schema({
    meetingId: {
        type: String
    },
    expertId: {
        type: String
    },
    userId: {
        type: String
    },
    userProfilePictureUrl: {
        type: String
    },
    userName: {
        type: String
    },
    review: {
        type: String
    },
    readFlag: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review