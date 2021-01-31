const axios = require('axios')
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors()) 

const access_key = '4d0b056957bfcccf0690ee0b9bf3c04e'

app.get('/city', async (req, res) => {  

  const lugar = JSON.stringify(req.query.query)
  const { data } = await axios(`http://api.weatherstack.com/current?access_key=${access_key}&query=${lugar}`)
  res.send(data)
 
})

app.listen('4567')
//npm start to initialize