import React, { useState } from 'react';
import Modal from 'react-modal';
import '../../styles/DayTodoModal.css';
import { Edit, X } from 'lucide-react';
import DailyTodoModal from './DetailTodoModal';
import { useSelector } from 'react-redux';

const DayTodosModal = ({date, isOpen, onClose, categories }) => {
    const [editingTodo, setEditingTodo] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const todos = useSelector(state => state.todos.todos);

    const handleEditClick = (todo) => {
        setEditingTodo(todo);
        setIsEditing(true);
    };
    const todosForDay = todos.filter(todo => {
        return todo.startDate <= date && todo.endDate >= date;
    });

    if (!todosForDay) return null;
    return (
        <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Todos for the Day"
        ariaHideApp={false}
        className="modal-dialog-centered todo-modal pe-1"
        overlayClassName="modal-overlay"
        >
            <div className="modal-content">
            <div className='d-flex'>
                <X size={30} onClick={onClose} className='btn-x'></X>
            </div>
            <div className='todo-list-container' style={{ overflowY: todos.length > 5 ? 'auto' : 'hidden' }}>
                {todosForDay.length > 0 ? todosForDay.map(todo => (
                    <div key={todo.id} onClick={() => handleEditClick(todo)} className='todo-daytodos-back-item'>
                    <ul className='todo-DayTodosItem w-100' style={{ backgroundColor: Array.isArray(categories) && categories.find(category => category.id === todo.categoryId)?.color }}>
                        <li className='todo-DayTodo-title w-100 d-flex justify-content-between'>{todo.title}
                        <Edit size={20} className="ellipsis-icon me-1" ></Edit>
                        </li>
                        
                        <li className='todo-DayTodo-date'>{todo.startDate} ~ {todo.endDate}</li>
                        <li className='todo-DayTodo-description'>{todo.description}</li>
                            

                    </ul>
                    </div>
                )) : <div className='d-flex align-items-center justify-content-center' style={{ height: '120px'}} >
                    일정이 없습니다
                    </div>
                }
            </div>
            
                <DailyTodoModal todo={editingTodo} isOpen={isEditing} onClose={() => setIsEditing(false)} />
            
            </div>
        </Modal>
    );
};

export default DayTodosModal;
