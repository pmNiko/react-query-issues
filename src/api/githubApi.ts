import axios from "axios"


export const githubApi = axios.create({
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization: 'Bearer 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'
    },

})

