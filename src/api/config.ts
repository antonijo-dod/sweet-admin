import axios from 'axios'

export const sweetServer = axios.create({
    baseURL: import.meta.env.VITE_SWEET_SERVER_URL
})

sweetServer.interceptors.request.use(
    (config) => {

        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc3NzY5MTI3LCJleHAiOjE2Nzc3NzI3Mjd9.nyIT5WQtl4nbddCT0U0-NiLC1uHReD7pB6cnW5zbmp0'

        if (token) {
            config.headers['Content-Type'] = 'application/json'
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => {
        console.log('Request interceptor error', error);
        return Promise.reject(error)
    }
)