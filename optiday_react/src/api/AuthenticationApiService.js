import { apiClient } from "./ApiClient";


// 실행 Jwt 인증
export const executeJwtAuthenticationService
= (email, password) =>
    apiClient.post(`/authenticate`,{email,password});