import Todoslist from "./Todoslist"
import '../styles/Main.css'
import { useAuth } from "../security/AuthContext"
import Calendar from "./Calendar"



function Main(){
    const {username} = useAuth()
    return(
        <div className="main contents">
            <div className="p-3">
            <Todoslist username={username}/>
            </div>
            <div>
            
            <div className="w-100 p-3">
            <Calendar username={username}/>
                <div className="feedback p-3 rounded">피드백
                </div>
            </div>
            </div>
        </div>
    )
}
export default Main