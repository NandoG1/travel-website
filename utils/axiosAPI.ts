import axios from "axios"

const getBaseURL = (): string => {
    if (typeof window !== 'undefined') {
        // Client side - use current origin
        return `${window.location.origin}/api/`;
    }
    
    // Server side - use environment variable or fallback
    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}/api/`;
    }
    
    return "http://localhost:3000/api/";
};

const baseURL: string = getBaseURL();

const AXIOS_API = axios.create({
    baseURL
})

export default AXIOS_API
