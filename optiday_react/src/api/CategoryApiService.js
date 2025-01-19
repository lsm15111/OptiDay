import { apiClient } from './ApiClient'

export const retrieveAllCategoriesForUsernameApi
    = (username) => apiClient.get(`/member/${username}/categories`)
