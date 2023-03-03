import axios from 'axios'

export const sweetServer = axios.create({
    baseURL: import.meta.env.VITE_SWEET_SERVER_URL
})

sweetServer.interceptors.request.use(
    (config) => {

        const { jwt } = JSON.parse(localStorage.getItem("user")!);

        if (jwt) {
            config.headers['Content-Type'] = 'application/json'
            config.headers.Authorization = `Bearer ${jwt}`
        }

        return config
    },
    (error) => {
        console.log('Request interceptor error', error);
        return Promise.reject(error)
    }
)