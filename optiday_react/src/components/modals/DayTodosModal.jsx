import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import '../../styles/DayTodoModal.css';
import { useAuth } from '../../context/AuthContext';
import { Edit, X } from 'lucide-react';
import DailyTodoModal from './DetailTodoModal';

const DayTodosModal = ({todos, isOpen, onClose }) => {
    
    const {categories} = useAuth();
    const [editingTodo, setEditingTodo] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTodos, setUpdatedTodos] = useState(todos);

    useEffect(() => {
        setUpdatedTodos(todos);
    }, [todos,setIsEditing]);

    const handleEditClick = (todo) => {
        setEditingTodo(todo);
        setIsEditing(true);
    };

    const handleTodoDelete = (todoId) => {
        setUpdatedTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
    };

    const handleTodoUpdate = (updatedTodo) => {
        setUpdatedTodos(prevTodos => prevTodos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)));
    };

    if (!todos) return null;

    return (
        <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Todos for the Day"
        ariaHideApp={false}
        className="modal-dialog-centered todo-modal"
        overlayClassName="modal-overlay"
        >
            <div className="modal-content">
            <div className='d-flex'>
                <X size={30} onClick={onClose} className='btn-x'></X>
            </div>
            <div className='todo-list-container' style={{ overflowY: updatedTodos.length > 5 ? 'auto' : 'hidden' }}>
                {updatedTodos.length > 0 ? updatedTodos.map(todo => (
                    <div key={todo.id} onClick={() => handleEditClick(todo)}>
                    <ul className='todo-DayTodosItem w-100' style={{ backgroundColor: categories.find(category => category.id === todo.categoryId)?.color }}>
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
            
                <DailyTodoModal todo={editingTodo} isOpen={isEditing} onDelete={handleTodoDelete} onUpdate={handleTodoUpdate} onClose={() => setIsEditing(false)} />
            
            </div>
        </Modal>
    );
};

export default DayTodosModal;
