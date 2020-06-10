const express = require('express')
const ReviewResponse = require('../models/reviewResponse')
const router = new express.Router()

// for get all reviewResponse
router.get('/reviewResponse', async (req, res) => {

    try{
      const reviewResponses = await ReviewResponse.find({})
      res.send(reviewResponses)
    }catch(e){
       res.status(500).send()
    }

})

// for get  reviewResponse by id
router.get('/reviewResponse/:id', async (req, res) => {
    const _id = req.params.id
    try{
        const reviewResponse = await ReviewResponse.findById(_id)
        if(!reviewResponse) {
            return res.status(404).send()
        }
        res.send(reviewResponse)
    }
    catch(e) {
             res.status(500).send()
         }
})

// create
router.post('/reviews/:review_id/responses', async (req, res) => {
    // const review_id = req.params.review_id
    // console.log(review_id)
    try {
        const reviewResponse = new ReviewResponse(req.body)
        if (reviewResponse) {
            await reviewResponse.save()
            res.status(201).send(reviewResponse)
        } else {
            return res.status(404).send()
        }
    } catch (e) {
        res.status(500).send()
    }
})

// for create reviewResponse
router.post('/reviewResponse', async (req, res) => {
    const reviewResponse = new ReviewResponse(req.body)

    try{
        await reviewResponse.save()
        res.status(201).send(reviewResponse)
    }catch(e){
        res.status(400).send(e)
    }
    
})

// for update reviewResponse
router.patch('/responses/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["reviewId", "reviewResponse", "userId"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Updates!' })
    }
    try {
        const reviewResponse = await ReviewResponse.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!reviewResponse) {
            return res.status(404).send()
        }
        res.send(reviewResponse)

    } catch (e) {
        res.status(400).send(e)
    }
})

// for delete reviewResponse
router.delete('/responses/:id', async (req, res) => {
   
    try{
     const reviewResponse = await ReviewResponse.findByIdAndDelete(req.params.id)
      
     if(!reviewResponse) {
         return res.status(404).send()
     }
    res.send()
      
    }catch(e) {
         res.status(500).send(e)
    }
})



module.exports = router