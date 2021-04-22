import axios from 'axios'

// first we create an axios' instance
// to access a url that we've done our backend
const api = axios.create({
    baseURL: 'http://localhost:3333'
})


export default api;