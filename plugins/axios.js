export default function ({ $axios, redirect }) {
    $axios.onRequest(config => {
        config.headers.Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo3LCJ1c2VyX3RpcG9faWQiOjEsImVtcHJlc2FfaWQiOm51bGwsInBhcmNlaXJhX2luZWEiOmZhbHNlLCJpYXQiOjE2ODc5ODM0MDYsImV4cCI6MTY4ODA2OTQwNn0.a2n7_gPiNF6atPuvKxKX2fhAhvWczVh5voot6VldyUE'
    })

    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status)
        if (code === 401) {
            redirect('/login')
        }
    })
}