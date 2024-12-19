import Todoslist from "./Todoslist"


function Main(){
    
    return(
        <div className="main contents">
            <div className="p-3">
            <Todoslist/>
            </div>
            <div className="w-100 p-3">
                <div className="feedback p-3 rounded">피드백
                </div>
              </div>
        </div>
    )
}
export default Main