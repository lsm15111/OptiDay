import { apiClient } from './ApiClient'

export const retrieveTodosApi
    = () => apiClient.get(`/todos/me`)

export const createTodoApi
    = (todo) => apiClient.post(`/todos`, todo)

export const updateTodoApi
    = (todoid, todo) => apiClient.put(`/todos/${todoid}`, todo)

export const deleteTodoApi
    = (todoid) => apiClient.delete(`/todos/${todoid}`)



export const retrieveTodosForFollowingApi
    = (followingId) => apiClient.get(`/todos/followings/${followingId}`)


export const retrieveTodoApi
    = (todoid) => apiClient.get(`/todos/${todoid}`)

export const retrieveDailyApi
    = () => apiClient.get(`/todos/daily`);