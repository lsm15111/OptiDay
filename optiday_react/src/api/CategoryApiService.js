import { apiClient } from './ApiClient'

export const retrieveAllCategoriesForUsernameApi
    = (username) => apiClient.get(`/members/${username}/categories`)

export const createCategoryApi
    = (username, category) => apiClient.post(`/members/${username}/category`, category)