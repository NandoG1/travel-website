import axios from "axios"

// For client-side requests, use relative URLs
// For server-side requests, use absolute URLs when needed
const baseURL: string = "/api/"

const AXIOS_API = axios.create({
    baseURL
})

export default AXIOS_API
