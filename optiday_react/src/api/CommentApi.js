import { apiClient } from "./ApiClient";

export const retrieveCommentApi 
    = (targetId) => apiClient.get(`/comments/${targetId}`)
    
export const createCommentApi 
= (comment) => apiClient.post(`/comments/`,comment)

export const updateCommentApi
    = (targetId,comment) => apiClient.put(`/comments/${targetId}`,comment)

export const deleteCommentApi 
    = (targetId) => apiClient.delete(`/comments/${targetId}`)

