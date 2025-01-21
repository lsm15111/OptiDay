import { apiClient } from './ApiClient'

export const createUser
    = (user) => apiClient.post(`/members`,user)

export const deleteTodoApi
    = (username, id) => apiClient.delete(`/members/${username}/todos/${id}`)

export const retrieveUserApi
    = (username) => apiClient.get(`/members/${username}`)

export const retrieveProfileApi
    = (username) => apiClient.get(`/members/${username}/profile`)

export const updateProfileApi
    = (username, profile) => apiClient.put(`/members/${username}/profile`, profile)