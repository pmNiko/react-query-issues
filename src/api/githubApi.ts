import axios from "axios"


export const githubApi = axios.create({
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization: 'Bearer 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'
    },

})

