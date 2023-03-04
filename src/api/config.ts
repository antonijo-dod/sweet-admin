import axios from 'axios'

export const sweetServer = axios.create({
    baseURL: import.meta.env.VITE_SWEET_SERVER_URL
})

sweetServer.interceptors.request.use(
    (config) => {

        const user = JSON.parse(localStorage.getItem("user")!);

        if (user) {
            config.headers['Content-Type'] = 'application/json'
            config.headers.Authorization = `Bearer ${user.jwt}`
        }

        return config
    },
    (error) => {
        console.log('Request interceptor error', error);
        return Promise.reject(error)
    }
)