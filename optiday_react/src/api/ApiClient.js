import axios from 'axios';

export const apiClient = axios.create(
    {
        // baseURL: 'http://localhost:8080/api' // 클라우드
        baseURL: 'http://13.209.180.83/api' // 배포용
    }
)