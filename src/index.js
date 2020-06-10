const express = require('express')
require('./db/mongoose')
const ratingRouter = require('./routers/rating')
const reviewRouter = require('./routers/review')
const reviewResponseRouter = require('./routers/reviewResponse')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(ratingRouter)
app.use(reviewRouter)
app.use(reviewResponseRouter)


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})