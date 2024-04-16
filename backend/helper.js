const axios = require('axios')
const FormData = require('form-data')

const getEnv = (envVarName) => {
  return process.env[envVarName]
}

const makeRequest = async (method, endpoint, data, isBlob) => {
  try {
    // Check if endpoint already has a protocol
    const protocolPattern = /^https?:\/\//i
    const url = protocolPattern.test(endpoint) ? endpoint : `https://${endpoint}`

    const axiosConfig = {
      method,
      maxBodyLength: Infinity,
      url,
      headers: {
        [process.env.API_KEY_NAME]: process.env.API_KEY
      },
      // Set responseType to blob for handling binary data
      responseType: isBlob ? 'blob' : 'json'
    }

    // If data needs to be sent as FormData
    if (isBlob && data instanceof FormData) {
      axiosConfig.headers['Content-Type'] = 'multipart/form-data'
      axiosConfig.data = data
    } else {
      axiosConfig.headers['Content-Type'] = 'application/json'
      axiosConfig.data = JSON.stringify(data)
    }

    console.log(`hitting ${url}!`)

    const response = await axios(axiosConfig)
    return response
  } catch (error) {
    if (error.message) {
      const data = {
        message: error?.message,
        data: error?.response?.data,
        status: error?.response?.status
      }
      console.log(`make-request error: ${JSON.stringify(data)}}`)
      return data
    }
  }
}

module.exports = {
  getEnv,
  makeRequest
}