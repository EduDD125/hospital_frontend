import axios from "axios"

const apiClient = axios.create({
    baseURL: 'https://hospital-backend-bzzi.onrender.com/',
    //baseURL: 'http://localhost:3000',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem('token');
        if(token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    function (error) {
        return Promise.reject(error)
    }
)

apiClient.interceptors.response.use(
    function (response) {
        console.log(response);
        return response;
    },
    function (error) {
        if (error.response && error.response.status === 401) {
            window.location.href = "/";
        }
        return Promise.reject(error)
    }
)

export default apiClient;
