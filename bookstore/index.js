const express = require('express')
const fs = require('fs')

const PORT = 8000

const books = [
  { id: 1, title: 'Book One', author: 'Author One' },
  { id: 2, title: 'Book Two', author: 'Author Two' },
];

const app = express()

// Middlewares
app.use(express.json())
app.use((req, res, next) => {
    const log = `[${Date.now()}] ${req.method} ${req.path}\n`
    fs.appendFileSync('log.txt', log, 'utf-8')
    next()
})

// Routes
app.get('/books', (req, res) => {
    res.setHeader('x-developer', 'Ayush')
    res.json(books)
})

app.get('/books/:id', (req, res) => {
    const id = parseInt(req.params.id)

    if(isNaN(id))
        return res
        .status(400)
        .json({error: "Id must be of type number"})

    const book = books.find(e => e.id === id) // SELECT * from books where id  = {id}
    
    if(!book) return res
    .status(404)
    .json({error: `Book with id ${id} does not exists!`})

    return res.json(book)
})

app.post('/books', (req, res) => {
    const { title, author } = req.body

    if(!title || title === "")
        return res.status(400).json({'error': 'title is required'})
    
    if(!author || author === "")
        return res.status(400).json({'error': 'author is required'})
    
    const id = books.length + 1;
    const book = {id, title, author}

    books.push(book)

    return res.status(201).json({'message': "Book Created successfully", id})
})

app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id)
    
    if (isNaN(id)) 
        return res.status(400).json({error: "Id must be of type number"})

    const indexToDelete = books.findIndex(e => e.id === id)

    if (indexToDelete === -1) 
        return res
        .status(404)
        .json({error: `Book with id ${id} does not exists!`})

    books.splice(indexToDelete, 1)

    return res.status(200).json({'message' : "Book Deleted successfully"})

})

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}.`)
})