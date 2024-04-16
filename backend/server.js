// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const helper = require('./helper')
const path = require('path')

const app = express();
app.use(cors());

app.post('/api/make-request', async (req, res) => {
    try {
      let { method, endpoint, data, isBlob, params } = req.body
  
      const url = `${helper.getEnv(endpoint)}${params}`
  
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