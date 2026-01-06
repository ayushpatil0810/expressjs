const express = require('express')

app = express()
const port = 8000
app.get('/', (req, res) => {
    res.send('Hello from Ayush')
})

app.get('/contact', (req, res) => {
    res.send('Contact Us Page')
})

app.post('/tweet', (req, res) => {
    res.status(201).send("Tweet Created")
})

app.get('/tweet', (req, res) => {
    res.send("Here are all your tweets")
})

app.listen(port, () => {
    console.log(`Server is running at ${port}`)
})
