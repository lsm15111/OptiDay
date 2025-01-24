import { apiClient } from "./ApiClient";

export const getFollowersApi 
    = (id) => apiClient.get(`/followers/${id}`)
export const getFollowingsApi 
    = (id) => apiClient.get(`/following/${id}`)

export const followApi 
    = (id) => apiClient.post(`/follow/${id}`)
export const unfollowApi 
    = (id) => apiClient.delete(`/follow/${id}`)