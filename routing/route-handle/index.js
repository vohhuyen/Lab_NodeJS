const express = require('express')
const app = express()
const port = 3000

// example a
app.get('/example/a', (req, res) => {
  res.send('Hello from A!')
})

// example b
app.get('/example/b', (req, res, next) => {
  console.log('the response will be sent by the next function ...')
  next()
}, (req, res) => {
  res.send('Hello from B!')
})

// example c
const cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}
const cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}
const cb2 = function (req, res) {
  res.send('Hello from C!')
}
app.get('/example/c', [cb0, cb1, cb2])



// example d
const cb3 = function (req, res, next) {
  console.log('CB0')
  next()
}
const cb4 = function (req, res, next) {
  console.log('CB1')
  next()
}
app.get('/example/d', [cb3, cb4], (req, res, next) => {
  console.log('the response will be sent by the next function ...')
  next()
}, (req, res) => {
  res.send('Hello from D!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})