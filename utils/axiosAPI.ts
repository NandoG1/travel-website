import axios from "axios"

const baseURL:string = "http://localhost:3000/api/"

const AXIOS_API = axios.create({
    baseURL
})

export default AXIOS_API
