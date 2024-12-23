import { Route, Routes, useLocation } from "react-router-dom"
import Sidebar from "./bars/Sidebar"
import Headerbar from "./bars/Headerbar"
import Feedback from "./Feedback"
import Main from "./Main"
import Login from "./Login"
import Mypage from "./Mypage"
import Follow from "./Follow"

import '../styles/OptidayApp.css'

function OptidayApp(){
  const location = useLocation();
  const isLoginPage = location.pathname === "/login"; //로그인 페이지일때 bar렌더링안함.

  return(
    <div className="OptidayApp">
      {!isLoginPage&&<Headerbar/>}
      <div className="center">
      {!isLoginPage&&<Sidebar/>}
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/feedback' element={<Feedback/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/mypage' element={<Mypage/>}/>
          <Route path='/follow' element={<Follow/>}/>
        </Routes>
        </div>
    </div>
  )
}
export default OptidayApp