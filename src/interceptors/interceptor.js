import axios from 'axios'
import baseURL from './baseurl'

// const baseURL = process.env.NODE_ENV
// ? ''
// : 'http://localhost:4000/';

// const baseURL = 'http://localhost:5000/'
const token = JSON.parse(localStorage.getItem('auth'))

const authAxios = axios.create({
  baseURL: baseURL,
  headers: {
    Authentication: token ? token.token : null,
  },
})

export default authAxios
