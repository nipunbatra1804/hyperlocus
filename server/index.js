const express = require('express')
const bodyParser = require('body-parser')
const store = require('./store')
const app = express()

const APP_PORT = 4000;

app.use(express.static('public'))
app.use(bodyParser.json())
app.post('/createUser', (req, res) => {
  store
    .createUser({
      username: req.body.username,
      password: req.body.password
    })
    .then(() => res.sendStatus(200))
})

app.post('/login', (req, res) => {
  store
    .authenticate({
      username: req.body.username,
      password: req.body.password
    })
    .then(({ success }) => {
      if (success) res.sendStatus(200)
      else res.sendStatus(401)
    })
})

app.get('/estate/:id', (req, res) => {
  store
  .then (( { success }) => {
    if (success) res.send({})
    else res.sendStatus(400)
  })
})

app.listen(APP_PORT, () => {
  console.log('Server running on http://localhost:3000')
})
