import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        'API-KEY': '72c36d3b-7f53-42fd-846b-d7ab7dcf97a8'
    },
})

export const usersAPI = {
getUsers(currentPage = 1, pageSize = 10) {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`)
        .then(response => {
          return  response.data;
        });
},
getUserId(userId) {
    return instance.get(`profile/` + userId)
    .then(response => {
        return response.data;
    })
},
getAuthMe() {
    return instance.get(`auth/me`) 
    .then(response => {
        return response.data;
    })
}
}
