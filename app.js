console.log('terminale')

const express = require('express')
const app = express()
const port = 3000
const posts = require('./data/posts.js')
const postsRouter = require('./routers/posts.js')
const cors = require('cors')

app.use(cors())
app.use(express.static('public'))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('root')
})

app.use('/posts', postsRouter)

app.listen(port, () => {
    console.log(`Server on port ${port}`)
})