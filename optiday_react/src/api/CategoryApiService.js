import { apiClient } from './ApiClient'

export const retrieveCategoriesApi
    = () => apiClient.get(`/categories/me`)

export const createCategoryApi
    = (category) => apiClient.post(`/categoryies`, category)