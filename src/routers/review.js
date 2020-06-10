const express = require('express')
const Review = require('../models/review')
const router = new express.Router()

// for get all ratings
router.get('/reviews', async (req, res) => {

    try {
        const reviews = await Review.find({})
        res.send(reviews)
    } catch (e) {
        res.status(500).send()
    }

})

//reviews?user=user_id
// for get last 20 review
router.get('/reviews123', async (req, res) => {
    const user_id = req.query.user
    console.log('id: ' + user_id)
    try {
        Review.find({
            'userId': user_id
        }).sort({
            'createdAt': 'desc',
        }).limit(20)
            .exec(function (err, reviews) {
                if (err) {
                    res.status(404).send()
                } else {
                    res.send(reviews)
                }
            })
    }
    catch (e) {
        res.status(500).send()
    }
})

// for create reviews
router.post('/review/save', async (req, res) => {
    const review = new Review(req.body)
    const user_id = req.query.user
    console.log(user_id)
    if (user_id != null && user_id != 'undefined') {
        review.user_id = user_id
        try {
            await review.save(review)
            res.status(201).send(review)
        } catch (e) {
            res.status(400).send(e)
        }
    }
})

// read true
router.post('/review/:review_id/read', async (req, res) => {
    const review_id = req.params.review_id
    console.log(review_id)
    try {
        const review = await Review.findById(review_id)
        if (review) {
            review.readFlag = true
            console.log(review)
            Review.update(review).exec(function (err, response) {
                if (err) {
                    res.status(404).send()
                } else {
                    res.send(response)
                }
            })
        } else {
            return res.status(404).send()
        }
    } catch (e) {
        res.status(500).send()
    }
})

// for get  ratings by id
router.get('/reviews/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const review = await Review.findById(_id)
        if (!review) {
            return res.status(404).send()
        }
        res.send(review)
    }
    catch (e) {
        res.status(500).send()
    }
})

// for create reviews
router.post('/reviews', async (req, res) => {
    const review = new Review(req.body)

    try {
        await review.save(review)
        res.status(201).send(review)
    } catch (e) {
        res.status(400).send(e)
    }

})

// for update ratings
router.patch('/reviews/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["meetingId", "expertId", "userId", "useProfilePictureUrl", "userName", "review", "readFlag"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Updates!' })
    }
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!review) {
            return res.status(404).send()
        }
        res.send(review)

    } catch (e) {
        res.status(400).send(e)
    }
})

// for delete ratings
router.delete('/reviews/:id', async (req, res) => {

    try {
        const review = await Review.findByIdAndDelete(req.params.id)

        if (!review) {
            return res.status(404).send()
        }
        // res.send(review)
        res.send()

    } catch (e) {
        res.status(500).send(e)
    }
})



module.exports = router