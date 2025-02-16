import { useState } from "react";
import '../styles/Todolist.css'
import DailyTodoModal from './modals/DetailTodoModal';

function Todoslist({username}){

    const {todos,categories} = useTodo();
    const [modalOpen, setModalOpen] = useState(false);
    const [todoItem, setTodoItem] = useState(null);
    //오늘 날짜
    const today = new Date().toISOString().split('T')[0]; 
    // console.log(today);
    //오늘 일정 filter -> todayTodos
    const todayTodos = todos.filter(todo => todo.startDate.split('T')[0] <= today&& todo.endDate.split('T')[0] >= today); 
    const handleItem = (id) => {
        if (modalOpen) return; // 모달이 열려 있으면 아무 작업도 하지 않음
        const todo = todayTodos.find(todo => todo.id === id);
        if (!todo) return; // todo가 없으면 종료
        setTodoItem(todo);
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    };
    return(
        <div className="todolist-container">
            <div className="today-text new-style">하루 일정</div>
            <div className="Todoslist scrollbar" >
                {/* <DailyTodoModal  todo={todoItem} isOpen={modalOpen} onClose={closeModal} username={username}/> */}
                {todayTodos.length === 0 ? (
                <div className="p-2 no-todos">
                        일정이 없습니다
                </div>
                ) : ( 
                    todayTodos.map((todo, index) => {
                        return (
                            <div className="todoitem p-2 " key={todo.id} onClick={() => handleItem(todo.id)} style={{ backgroundColor: categories.find(category => category.id === todo.categoryId)?.color }}>
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