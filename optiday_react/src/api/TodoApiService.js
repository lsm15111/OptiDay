import { apiClient } from './ApiClient'

export const retrieveAllTodosForUsernameApi
    = (username) => apiClient.get(`/members/${username}/todos`)

export const deleteTodoApi
    = (username, todoid) => apiClient.delete(`/members/${username}/todo/${todoid}`)

export const retrieveTodoApi
    = (username, todoid) => apiClient.get(`/members/${username}/todo/${todoid}`)

export const updateTodoApi
    = (username, todoid, todo) => apiClient.put(`/members/${username}/todo/${todoid}`, todo)

export const createTodoApi
    = (username,  todo) => apiClient.post(`/members/${username}/todo`, todo)


export const retrieveDailyTodosForUsernameApi
    = (username) => apiClient.get(`/members/${username}/daily`);