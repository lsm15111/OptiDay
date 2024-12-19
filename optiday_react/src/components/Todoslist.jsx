function Todoslist(){

    const todos = [
        {title:'운동',startdate:'10:00',enddate:'11:30', id: 1},
        {title:'저녁 약속',startdate:'18:00',enddate:'20:00', id: 2},
        {title:'운동',startdate:'20:30',enddate:'21:30', id: 3},
    ]
    return(
    <div className="Todoslist rounded">
        {todos.map( (todo,index)=>{
            return(
                <div className="todoitem" key={todo.id}>
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