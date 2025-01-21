import { apiClient } from './ApiClient'

export const retrieveAllTodosForUsernameApi
    = (username) => apiClient.get(`/members/${username}/todos`)

export const deleteTodoApi
    = (username, id) => apiClient.delete(`/members/${username}/todo/${id}`)

export const retrieveTodoApi
    = (username, id) => apiClient.get(`/members/${username}/todo/${id}`)

export const updateTodoApi
    = (username, todoid, todo) => apiClient.put(`/members/${username}/todo/${todoid}`, todo)

export const createTodoApi
    = (username,  todo) => apiClient.post(`/members/${username}/todo`, todo)


export const retrieveDailyTodosForUsernameApi
    = (username) => apiClient.get(`/members/${username}/daily`);