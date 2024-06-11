const express = require('express')
const app = express()
const port = 3000

app.get('/users/:userId/books/:bookId', (req, res) => {
  res.send(req.params)
})
app.get('/flights/:from-:to', (req, res) => {
  res.send(req.params)
})
app.get('/plantae/:genus.:species', (req, res) => {
  res.send(req.params)
})
app.get('/user/:userId(\d+)', (req, res) => {
  res.send(req.params)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})