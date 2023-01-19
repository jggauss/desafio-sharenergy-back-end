const axios = require('axios')
const apiUserRandom = axios.create({
    baseURL: "https://randomuser.me/"
    
})

module.exports =  apiUserRandom