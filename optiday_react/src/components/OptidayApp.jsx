import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import Sidebar from "./bars/Sidebar"
import Headerbar from "./bars/Headerbar"
import Feedback from "./Feedback"
import Main from "./Main"
import Login from "./Login"
import Mypage from "./Mypage"
import Signup from "./Signup"
import Follow from "./Follow"

import '../styles/OptidayApp.css'
import AuthProvider, { useAuth } from "../security/AuthContext"


function AuthenticatedRoute({children}){ // 인증 있을경우만 route 하위 보여주기
  const authContext = useAuth()
  if(authContext.isAuthenticated){
    return children
  }
  return <Navigate to="/login"/> // 사용자 인증 취소시 login page로
}



function OptidayApp(){
  const location = useLocation();
  const isLoginPage = location.pathname === "/login" || location.pathname === "/signup";

  return(
    <div className="OptidayApp">
      <AuthProvider>
      {!isLoginPage&&<Headerbar/>}
      <div className="center">
      {!isLoginPage&&<Sidebar/>}
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          {/* 인증 필요 */}
          <Route path='/main/:username' element={
            <AuthenticatedRoute>
            <Main/>
            </AuthenticatedRoute>
            }/>
          <Route path='/main' element={
            <AuthenticatedRoute>
            <Main/>
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
            <Follow/>
            </AuthenticatedRoute>
            }/>
          
        </Routes>
        </div>
        </AuthProvider>
    </div>
  )
}

export default OptidayApp