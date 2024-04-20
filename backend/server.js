// server.js
const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()
const helper = require('./helper')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

app.post('/api/make-request', async (req, res) => {
    try {
      let { method, endpoint, data, isBlob, params } = req.body
  
      const url = `${helper.getEnv(endpoint)}${params}`

      console.log('hitting: ' + url)
  
      const response = await helper.makeRequest(method, url, data, isBlob)
  
      if (response?.status >= 200 && response?.status < 300) {
        return res.json(response.data)
      } else {
        return res.status(response?.status ?? 500).json(response.data)
      }
    } catch (error) {
      const data = {
        message: 'An error occurred!',
        data: 'An error occurred!'
      }
      return res.status(500).json(data)
    }
  });

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../build')))

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});