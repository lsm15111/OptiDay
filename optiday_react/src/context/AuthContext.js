import { createContext, useContext, useState } from "react";
import { executeJwtAuthenticationService } from "../api/AuthenticationApiService";
import { apiClient } from "../api/ApiClient";
import { retrieveAllCategoriesForUsernameApi } from "../api/CategoryApiService";

//Context 생성
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// 다른 컴포넌트와 생성된 context 공유
function AuthProvider({children}){
    const [isAuthenticated, setAuthenticated] = useState(false)
    const [username, setUsername] = useState(null)
    const [token, setToken] = useState(null)
    const [categories, setCategories] = useState([])

    const fetchCategories = async (username) => {
        try {
            const response = await retrieveAllCategoriesForUsernameApi(username);
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    async function login(username, password){
        try{
            const responseToken = await executeJwtAuthenticationService(username, password)
            if(responseToken.status==200){
                const jwtToken = 'Bearer '+responseToken.data.token
                setAuthenticated(true)
                setUsername(username)
                setToken(jwtToken)
                apiClient.interceptors.request.use(
                    (config) =>{
                        console.log('intercepting and adding a token')
                        config.headers.Authorization = jwtToken
                        return config
                    }
                )
                await fetchCategories(username);
                return true
            }else{
                setAuthenticated(false)
                setUsername(null)
                setToken(null)
                return false
            }
        } catch(error){
            logout()
            return false
        }
    }

    function logout(){
        setAuthenticated(false)
        setToken(null)
        setUsername(null)
    }

    return(
        <AuthContext.Provider value={{ isAuthenticated, login, logout, username, token, categories }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;