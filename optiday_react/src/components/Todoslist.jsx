
function Todoslist(){


    const todos = [
        {title:'운동',startdate:'10:00',enddate:'11:30'},
        {title:'저녁 약속',startdate:'18:00',enddate:'20:00'},
        {title:'운동',startdate:'10:00',enddate:'11:30'},
    ]
    return(
    <div className="Todoslist rounded ">
        {todos.map( (todo,index)=>{
            return(
                <div className="todoitem">
                    <div>
                        {todo.title}
                    </div>
                    <div>
                        {todo.startdate} ~ {todo.enddate}
                    </div>
                </div>
            );
        })}
    </div>
    )
}
export default Todoslist