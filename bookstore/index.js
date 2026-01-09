const express = require('express')
const bookRouter = require('./routes/books.routes')
const { loggerMiddleware } = require('./middlewares/logger')
const PORT = 8000

const app = express()

// Middlewares
app.use(express.json())
app.use(loggerMiddleware)

// Routes
app.use('/books', bookRouter)

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}.`)
})