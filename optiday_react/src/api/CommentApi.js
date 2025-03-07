import { apiClient } from "./ApiClient";

export const retrieveCommentApi 
    = (todoId) => apiClient.get(`/todos/${todoId}/comments`)
    
export const createCommentApi 
    = (todoId, comment) => apiClient.post(`/todos/${todoId}/comments`,comment)

export const updateCommentApi
    = (todoId,commentId,comment) => apiClient.put(`/todos/${todoId}/comments/${commentId}`,comment)

export const deleteCommentApi 
    = (todoId,commentId) => apiClient.delete(`/todos/${todoId}/comments/${commentId}`)

