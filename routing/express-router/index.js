const express = require('express')
const app = express()
const port = 3000

const birds = require('./birds')
app.use('/birds', birds)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})