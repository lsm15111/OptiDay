import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import Sidebar from "./layout/Sidebar"
import Headerbar from "./layout/Headerbar"
import Login from "../pages/Login"
import Signup from "../pages/Signup"

import Feedback from "../pages/Feedback"
import Main from "../pages/Main"
import Mypage from "../pages/Mypage"
import Follow from "../pages/Follow"
import '../styles/OptidayApp.css'
import AuthProvider, { useAuth } from "../context/AuthContext"


function AuthenticatedRoute({children}){ // 인증 있을경우만 route 하위 보여주기
  const authContext = useAuth()
 // 인증 상태 복원이 완료되지 않았을 경우 로딩 표시
 if (!authContext.isAuthLoaded) {
  return 
}
  if(!authContext.isAuthenticated){
    return <Navigate to="/login"/> 
  }
  return children 
}

function OptidayApp(){
  const location = useLocation();
  const isLoginPage = location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/";

  return(
    <div className="OptidayApp">
      <AuthProvider>
      <AuthenticatedRoute>
        {!isLoginPage&&<Headerbar/>}
      </AuthenticatedRoute>
      <div className="center">
      <AuthenticatedRoute>
        {!isLoginPage&&<Sidebar/>}
      </AuthenticatedRoute>
        <Routes>

          {/* path '/' */}
          <Route path='/' element={ <Login/> }/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          
          {/* 인증 필요 */}
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