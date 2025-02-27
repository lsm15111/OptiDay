import { apiClient } from './ApiClient'

export const retrieveCategoriesApi
    = () => apiClient.get(`/categories/me`)

export const createCategoryApi
    = (category) => apiClient.post(`/categories`, category)

export const updateCategoryApi
    = (category) => apiClient.put(`/categories/${category.id}`, category)

export const updateCategoryNameApi
    = (id,name) => apiClient.patch(`/categories/${id}/update-name`,{name:name})
    
export const updateCategoryColorApi
    = (id,color) => apiClient.patch(`/categories/${id}/update-color`,{color:color})

export const deleteCategoryApi
    = (categoryId) => apiClient.delete(`/categories/${categoryId}`)