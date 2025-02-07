import { apiClient } from './ApiClient'

export const signupApi
    = (user) => apiClient.post(`/members/signup`,user)

export const retrieveMemberApi
    = () => apiClient.get(`/members/me`)

export const retrieveMessageApi
    = () => apiClient.get(`/members/message`);


export const retrieveProfileApi
    = () => apiClient.get(`/members/profile`)

export const updateProfileApi
    = (profileUpdate) => apiClient.put(`/members/profile`, profileUpdate)


export const deleteTodoApi
    = (username, id) => apiClient.delete(`/members/${username}/todos/${id}`)

export const retrieveUserApi
    = (username) => apiClient.get(`/members/${username}`)

export const AccountSearchApi
    = (newPage,pageSize,search) => apiClient.get(`/members/search`,{params:{currentPage:newPage,pageSize:pageSize,search:search}})