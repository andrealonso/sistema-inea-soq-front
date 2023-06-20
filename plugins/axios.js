export default function ({ $axios, redirect }) {
    $axios.onRequest(config => {
        config.headers.Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjg3MTg3NDQ0LCJleHAiOjE2ODcyNzM0NDR9.YEYNwvacg4z8wGJ7V4GSI9x2iHXRJ6XyRJQLBUjgJ9g'
    })

    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status)
        if (code === 400) {
            redirect('/400')
        }
    })
}