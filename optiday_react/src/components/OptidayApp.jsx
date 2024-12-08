import { BrowserRouter, Route, Routes } from "react-router-dom"
import Sidebar from "./Sidebar"
import '../styles/OptidayApp.css'
import Headerbar from "./Headerbar"
import Todoslist from "./Todoslist"


function OptidayApp(){
  
  return(
    <div className="OptidayApp">
      <BrowserRouter>
      <Headerbar/>
      <div className="center">
      <Sidebar/>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/todo' element={<Todo/>}/>
          <Route path='/feedback' element={<Feedback/>}/>
        </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

  function Main(){
    return(
      <div className="main contents">
        <div>
        <Todoslist/>
        </div>
        <div className="calendar">
          calendar
        </div>
      </div>
    )
  }
  function Todo(){
    return(
      <div className="todo contents">
      </div>
    )
  }
  function Feedback(){
    return(
      <div className="feedback contents">
        Feedback
      </div>
    )
  }
  
export default OptidayApp