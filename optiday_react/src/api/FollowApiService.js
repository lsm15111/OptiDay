import { apiClient } from "./ApiClient";

export const getFollowersApi 
    = (id) => apiClient.get(`/followers/${id}`)
export const getFollowingsApi 
    = (id) => apiClient.get(`/following/${id}`)

export const followApi 
    = (memberId, followId) => apiClient.post(`/follow/${memberId}/${followId}`)
export const unfollowApi 
    = (memberId, followId) => apiClient.delete(`/unfollow/${memberId}/${followId}`)