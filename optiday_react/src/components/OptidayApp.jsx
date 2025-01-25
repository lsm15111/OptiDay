import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import Sidebar from "./bars/Sidebar"
import Headerbar from "./bars/Headerbar"
import Feedback from "../pages/Feedback"
import Main from "../pages/Main"
import Login from "../pages/Login"
import Mypage from "../pages/Mypage"
import Signup from "../pages/Signup"
import Follow from "../pages/Follow"

import '../styles/OptidayApp.css'
import AuthProvider, { useAuth } from "../context/AuthContext"
import TodoProvider from "../context/TodoContext"
import FollowProvider from "../context/FollowContext"

function AuthenticatedRoute({children}){ // 인증 있을경우만 route 하위 보여주기
  const authContext = useAuth()

  if(!authContext.isAuthLoaded){
    return <div>로딩중...</div>
  }
  if(authContext.isAuthenticated){
    return children
  }
  return <Navigate to="/login"/> // 사용자 인증 취소시 login page로
}

function OptidayApp(){
  const location = useLocation();
  const isLoginPage = location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/";

  return(
    <div className="OptidayApp">
      <AuthProvider>

      {!isLoginPage&&<Headerbar/>}
      <div className="center">
      {!isLoginPage&&<Sidebar/>}
        <Routes>

          {/* path '/' */}

          <Route path='/' element={ <Login/> }/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          
          {/* 인증 필요 */}
          <Route path='/main/:username' element={
            <AuthenticatedRoute>
              <TodoProvider>
                <Main/>
              </TodoProvider>
            </AuthenticatedRoute>
            }/>
          <Route path='/feedback' element={
            <AuthenticatedRoute>
            <Feedback/>
            </AuthenticatedRoute>
          }/>
          <Route path='/mypage' element={
            <AuthenticatedRoute>
            <Mypage/>
            </AuthenticatedRoute>
            }/>
          <Route path='/follow' element={
            <AuthenticatedRoute>
              <FollowProvider>
                <Follow/>
              </FollowProvider>
            </AuthenticatedRoute>
            }/>

          
        </Routes>
        </div>
        </AuthProvider>
    </div>
  )
}

export default OptidayApp