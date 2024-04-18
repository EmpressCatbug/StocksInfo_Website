import axios from 'axios'

const makeRequest = async (method, endpoint, data, isBlob, params = '') => {
  const requestData = { method, endpoint, data, isBlob, params }
  const url = `https://www.stocksinfo.net/api/make-request`

  try {
    const config = {
      method: 'POST',
      url,
      data: requestData
    }
    const response = await axios.request(config)
    return response
  } catch (error) {
    if (error.message) {
      const data = {
        message: error.message,
        data: error.response.data
      }
      return data
    }
  }
}

const isSuccess = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return true
  } else {
    return false
  }
}

const getEarnings = async (months) => {
  if (!months) {
    return null
  }

  const params = `/?months=${months}`
  return await makeRequest('get', 'REACT_APP_API_ENDPOINT_STOCKSANALYZER', null, true, params)
}

export { getEarnings,isSuccess}