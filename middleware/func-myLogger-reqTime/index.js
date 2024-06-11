const express = require('express')
const app = express()
const port = 3000


// Mylogger
const myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}
app.use(myLogger)


// request Time
const requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}
app.use(requestTime)
app.get('/', (req, res) => {
  let responseText = 'Hello World!<br>'
  responseText += `<small>Requested at: ${req.requestTime}</small>`
  res.send(responseText)
})



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})