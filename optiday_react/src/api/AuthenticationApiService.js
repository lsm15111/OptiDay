import { apiClient } from "./ApiClient";


// 실행 Jwt 인증
export const executeJwtAuthenticationService
= (username, password) =>
    apiClient.post(`/authenticate`,{username,password});