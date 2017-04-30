const app = require('express')()
const beck = require('./beck.txt.json')
const tags = require('./pos.json')

const PORT = process.env.PORT || 8080

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.get('/lyrics/tagged', (req, res) => {
  res.set('content-type', 'application/json')
  res.send(beck.lyrics)
})

app.get('/lyrics/tagged/frequencies', (req, res) => {
  res.send(beck.freqs)
})

app.get('/pos/tags', (req, res) => {
  res.send(tags)
})

app.listen(PORT, () => console.log(`on ${PORT}`))
