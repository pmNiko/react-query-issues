import axios from "axios"


export const githubApi = axios.create({
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization: 'Bearer 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'
    },

})

