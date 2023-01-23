import axios from "axios"


export const githubApi = axios.create({
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization: 'Bearer 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'
    },

})

