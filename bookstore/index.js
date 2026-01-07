const express = require('express')
const PORT = 8000

const books = [
  { id: 1, title: 'Book One', author: 'Author One' },
  { id: 2, title: 'Book Two', author: 'Author Two' },
];

const app = express()

app.get('/books', (req, res) => {
    res.setHeader('x-developer', 'Ayush')
    res.json(books)
})

app.get('/books/:id', (req, res) => {
    const id = parseInt(req.params.id)

    if(isNaN(id))
        return res
        .status(400)
        .json({error: `Id must be of type number`})

    const book = books.find(e => e.id === id) // SELECT * from books where id  = {id}
    
    if(!book) return res
    .status(404)
    .json({error: `Book with id ${id} does not exists!`})

    return res.json(book)
})


app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}.`)
})