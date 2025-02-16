import { apiClient } from './ApiClient'

export const retrieveCategoriesApi
    = () => apiClient.get(`/categories/me`)

export const createCategoryApi
    = (category) => apiClient.post(`/categoryies`, category)

export const updateCategoryApi
    = (category) => apiClient.put(`/categories/${category.id}`, category)

export const deleteCategoryApi
    = (categoryId) => apiClient.delete(`/categoryies/${categoryId}`)