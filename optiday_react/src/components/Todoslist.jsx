import { useEffect, useState } from "react";
import { retrieveDailyTodosForUsernameApi } from "../api/TodoApiService";
import '../styles/Todolist.css'
import TodoDetail from './modals/TodoDetailModal';

function Todoslist({username}){
    const [loading,setLoading] = useState(true);
    const [dailyTodos,setDailyTodos] = useState([])
    const [selectedTodo, setSelectedTodo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            retrieveDailyTodosForUsernameApi(username)
            .then(response => {
                setDailyTodos(response.data)
                setLoading(false);
            })
            .catch(error => console.error(error))
        };
        fetchData();
    }, [username]);
    
    const handleItem = (id) =>{
        const todo = dailyTodos.find(todo => todo.id === id);
        setSelectedTodo(todo);
    }

    const closeDetail = () => {
        setSelectedTodo(null);
    }

    const handleUpdateTodo = (updatedTodo) => {
        setDailyTodos((prevTodos) => 
            prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
        );
    };

    if(loading) return (<div>로딩 중...</div>)

    return(
        <div className="todolist-container">
            <div className="today-text new-style">하루 일정</div>
            <div className="Todoslist">
                {selectedTodo && <TodoDetail todo={selectedTodo} onClose={closeDetail} username={username} handleUpdate={handleUpdateTodo} />}
                {dailyTodos.length === 0 ? (
                <div className="p-3 no-todos">
                        일정이 없습니다
                </div>
                ) : (
                    dailyTodos.map((todo, index) => {
                        return (
                            <div className="todoitem p-2 m-2" key={todo.id} onClick={() => handleItem(todo.id)}>
                                <div className="fs-5">
                                    {todo.title}
                                </div>
                                <div className="todo-date">
                                    {todo.startDate} ~ {todo.endDate}
                                </div>
                                <div className="todo-description">
                                    {todo.description.length > 30 ? `${todo.description.substring(0, 30)}...` : todo.description}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    )
}
export default Todoslist