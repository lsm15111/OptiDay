import { createContext, useContext, useEffect, useState } from "react";
import { executeJwtAuthenticationService } from "../api/AuthenticationApiService";
import { apiClient } from "../api/ApiClient";
import { retrieveMemberIdApi } from "../api/UserApiService";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

function AuthProvider({children}){
    const [isAuthenticated, setAuthenticated] = useState(false)
    const [username, setUsername] = useState(null)
    const [token, setToken] = useState(null)
    const [memberId, setMemberId] = useState(null)
    const [isAuthLoaded, setAuthLoaded] = useState(false); // 상태 복원 완료 여부 추가
    // 브라우저에 저장된 데이터 복원
    useEffect(() => {
        console.log("AuthContext useEffect")
        const storedToken = localStorage.getItem("token");
        const storedUsername = localStorage.getItem("username");

        if (storedToken && storedUsername) {
        setToken(storedToken);
        setUsername(storedUsername);
        setAuthenticated(true);

        apiClient.interceptors.request.use((config) => {
            config.headers.Authorization = storedToken;
            return config;
        });

        fetchMemberId(storedUsername);
        }
        setAuthLoaded(true); // 상태 복원이 완료되었음을 설정
    }, []);

    const fetchMemberId = async (username) => {
        try {
            const response = await retrieveMemberIdApi(username);
            setMemberId(response.data);
        } catch (error) {
            console.error('Error fetching member ID:', error);
        }
    };
    

    async function login(username, password){
        try{
            const responseToken = await executeJwtAuthenticationService(username, password)
            if(responseToken.status === 200){
                const jwtToken = 'Bearer '+responseToken.data.token
                setAuthenticated(true)
                setUsername(username)
                setToken(jwtToken)

                // 토큰과 사용자 정보 저장
                localStorage.setItem("token", jwtToken);
                localStorage.setItem("username", username);
                apiClient.interceptors.request.use(
                    (config) =>{
                        console.log('intercepting and adding a token')
                        config.headers.Authorization = jwtToken
                        return config
                    }
                )
                await fetchMemberId(username);
                // console.log('로그인 성공');
                return true
            }else{
                logout()
                // console.log('로그인 실패');
                return false
            }
        } catch(error){
            // console.error('로그인 에러:', error);
            logout()
            return false
        }
    }

    
    function logout(){
        setMemberId(null);
        setAuthenticated(false)
        setToken(null)
        setUsername(null)

        //로컬 스토리지에서 데이터 삭제
        localStorage.removeItem("token");
        localStorage.removeItem("username");
    }

    return(
        <AuthContext.Provider value={{ isAuthenticated, login, logout, username, token, memberId, isAuthLoaded }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;