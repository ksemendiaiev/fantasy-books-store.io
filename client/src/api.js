import axios from "axios";

//const API_URL = "https://fantasy-books-storeio-production.up.railway.app/api/v1";
const API_URL = "http://localhost:1000/api/v1";


const api = axios.create({
    baseURL: API_URL,
});

export default api;
