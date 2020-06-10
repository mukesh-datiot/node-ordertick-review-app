const express = require('express')
const Rating = require('../models/rating')
const router = new express.Router()

// for get all ratings
router.get('/ratings', async (req, res) => {

    try{
      const ratings = await Rating.find({})
      res.send(ratings)
    }catch(e){
       res.status(500).send()
    }

})

// for get  ratings by id
router.get('/ratings/:id', async (req, res) => {
    const _id = req.params.id
    try{
        const rating = await Rating.findById(_id)
        if(!rating) {
            return res.status(404).send()
        }
        res.send(rating)
    }
    catch(e) {
             res.status(500).send()
         }
})
//ratings?user=user_id&rating=low
// for get lowest rating and highest rating
router.get('/ratings123', async (req, res) => {
    const user_id = req.query.user
    const rating = req.query.rating
    var feedbackRating='asc'// for low
    if(rating==='high'){
        feedbackRating='desc'
    }
    console.log('Id: '+user_id+'\nRating: '+feedbackRating)
    try{
        Rating.find({
            'userId':user_id
        }).sort({ 
            'feedbackRating':feedbackRating,
            'createdAt':'desc'
        }).limit(10).exec(function (err, ratings) {
            if (err) {
                res.status(404).send()
            } else {
                res.send(ratings)
            }
        })
    }
    catch(e) {
             res.status(500).send()
         }
})

// for create ratings
router.post('/ratings', async (req, res) => {
    const rating = new Rating(req.body)

    try{
        await rating.save()
        res.status(201).send(rating)
    }catch(e){
        res.status(400).send(e)
    }
    
})

// for update ratings
router.patch('/ratings/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["expertId", "userId", "feedbackRating", "feedbackDetails"]
    const isValidOperation =updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOperation){
        return res.status(400).send({ error: 'Invalid Updates!'})
    }
    try{
     const rating = await Rating.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      
     if(!rating) {
         return res.status(404).send()
     }
     res.send(rating)
      
    }catch(e) {
         res.status(400).send(e)
    }
})

// for delete ratings
router.delete('/ratings/:id', async (req, res) => {
   
    try{
     const rating = await Rating.findByIdAndDelete(req.params.id)
      
     if(!rating) {
         return res.status(404).send()
     }
    // res.send(rating)
    res.send()
      
    }catch(e) {
         res.status(500).send(e)
    }
})



module.exports = router