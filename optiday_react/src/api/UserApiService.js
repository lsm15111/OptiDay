import { apiClient } from './ApiClient'

export const createUser
    = (user) => apiClient.post(`/member`,user)

export const deleteTodoApi
    = (username, id) => apiClient.delete(`/member/${username}/todos/${id}`)

export const retrieveUserApi
    = (username) => apiClient.get(`/member/${username}`)

export const retrieveProfileApi
    = (username) => apiClient.get(`/member/${username}/profile`)