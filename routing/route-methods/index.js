const express = require('express')
const app = express()
const port = 3000

// GET method route
app.get('/', (req, res) => {
  res.send('GET request to the homepage')
})

// POST method route
app.post('/', (req, res) => {
  res.send('POST request to the homepage')
})

// All 
app.all('/secret', (req, res, next) => {
  console.log('Accessing the secret section ...')
  next() // pass control to the next handler
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})