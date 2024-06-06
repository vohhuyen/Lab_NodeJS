const express = require('express')
const cookieParser = require('cookie-parser')
const cookieValidator = require('./cookieValidator')
const app = express()
const port = 3000

async function validateCookies (req, res, next) {
  await cookieValidator(req)
  next()
}

app.use(cookieParser())

app.use(validateCookies)

app.get('/', (req, res) => {
  res.send('GET request to the homepage')
})

// error handler
app.use((err, req, res, next) => {
  res.status(400).send(err.message)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})