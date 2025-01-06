import axios from "axios";

const API_URL = "https://fantasy-books-storeio-production.up.railway.app/api/v1";

const api = axios.create({
    baseURL: API_URL,
});

export default api;