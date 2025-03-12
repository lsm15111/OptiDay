import { apiClient } from "./ApiClient";

export const retrieveFollowApi
    = () => apiClient.get(`/follows/relations`)

export const followApi 
    = (targetId) => apiClient.post(`/follows/follow/${targetId}`)
export const unfollowApi 
    = (targetId) => apiClient.delete(`/follows/unfollow/${targetId}`)

