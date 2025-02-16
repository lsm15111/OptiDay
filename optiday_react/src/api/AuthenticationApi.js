import { apiClient } from "./ApiClient";


// 로그인 Jwt 인증
export const executeJwtAuthenticationService
= (email, password) =>
    apiClient.post(`/authenticate`,{email,password});