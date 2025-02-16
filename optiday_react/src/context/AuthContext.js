import { createContext, useContext, useEffect, useState, useRef } from "react";
import { executeJwtAuthenticationService } from "../api/AuthenticationApi";
import { apiClient } from "../api/ApiClient";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [isAuthLoaded, setAuthLoaded] = useState(false); // 상태 복원 완료 여부 추가
    const interceptorRef = useRef(null); // useRef로 인터셉터 관리

    // 토큰 만료 여부 확인 함수
    function isTokenExpired(token) {
        try {
            const { exp } = jwtDecode(token);
            const currentTime = Math.floor(Date.now() / 1000);
            return exp < currentTime; // 만료 시간이 현재 시간보다 이전이면 만료
        } catch (error) {
            console.error("Error decoding token:", error);
            return true; // 디코딩 실패 시 만료된 것으로 간주
        }
    }

    // 브라우저에 저장된 데이터 복원
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken && !isTokenExpired(storedToken)) {
            setAuthenticated(true);
            setAuthLoaded(true);

            // 기존 인터셉터 제거
            if (interceptorRef.current !== null) {
                apiClient.interceptors.request.eject(interceptorRef.current);
            }

            // 새로운 인터셉터 등록
            interceptorRef.current = apiClient.interceptors.request.use((config) => {
                // console.log('Intercepting and adding a token');
                config.headers.Authorization = storedToken;
                return config;
            });
        } else {
            logout();
        }

        // 컴포넌트 언마운트 시 인터셉터 제거
        return () => {
            if (interceptorRef.current !== null) {
                apiClient.interceptors.request.eject(interceptorRef.current);
            }
        };
    }, []);

    async function login(email, password) {
        try {
            const responseToken = await executeJwtAuthenticationService(email, password);
            if (responseToken.status === 200) {
                const jwtToken = 'Bearer ' + responseToken.data.token;
                setAuthenticated(true);

                // 기존 인터셉터 제거
                if (interceptorRef.current !== null) {
                    apiClient.interceptors.request.eject(interceptorRef.current);
                }

                // 새로운 인터셉터 등록
                interceptorRef.current = apiClient.interceptors.request.use((config) => {
                    // console.log('Intercepting and adding a token');
                    config.headers.Authorization = jwtToken;
                    return config;
                });

                // 토큰 저장
                localStorage.setItem("token", jwtToken);
                setAuthLoaded(true);
                return true;
            } else {
                logout();
                return false;
            }
        } catch (error) {
            console.error('Login error:', error);
            logout();
            return false;
        }
    }

    function logout() {
        setAuthenticated(false);
        setAuthLoaded(false);

        // 로컬 스토리지에서 토큰 삭제
        localStorage.removeItem("token");

        // 인터셉터 제거
        if (interceptorRef.current !== null) {
            apiClient.interceptors.request.eject(interceptorRef.current);
            interceptorRef.current = null; // 인터셉터 변수 초기화
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, isAuthLoaded }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
