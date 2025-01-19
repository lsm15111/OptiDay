import { apiClient } from './ApiClient'

export const retrieveAllTodosForUsernameApi
    = (username) => apiClient.get(`/member/${username}/todos`)

export const deleteTodoApi
    = (username, id) => apiClient.delete(`/member/${username}/todo/${id}`)

export const retrieveTodoApi
    = (username, id) => apiClient.get(`/member/${username}/todo/${id}`)

export const updateTodoApi
    = (username, todoid, todo) => apiClient.put(`/member/${username}/todo/${todoid}`, todo)

export const createTodoApi
    = (username,  todo) => apiClient.post(`/member/${username}/todo`, todo)


export const retrieveDailyTodosForUsernameApi
    = (username) => apiClient.get(`/member/${username}/daily`);