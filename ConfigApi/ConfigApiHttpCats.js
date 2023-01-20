const axios = require('axios')

const apiHTTPCats = axios.create({
    baseURL: "https://http.cat/"
    
})
module.exports = apiHTTPCats