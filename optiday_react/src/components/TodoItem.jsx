import React from 'react';

import '../styles/TodoItem.css';
const TodoItem = ({ todo, isSelected, onToggle, getStatus, eventColor }) => {

    const today = new Date().toISOString().split('T')[0];
    const status = getStatus(todo, today); // props로 받은 getStatus 사용
    // 상태에 따른 클래스 이름 설정
    const statusClass = status === '진행 중' ? 'status-in-progress' 
    : status === '시작 전' ? 'status-upcoming' 
    : 'status-completed';

    return (
    <li className={`list-group-item rounded m-1 ${statusClass} ${isSelected ? 'todoitem-active' : ''}`} style={{ backgroundColor: eventColor }}>
        <div className="d-flex justify-content-between todoitem-container" onClick={onToggle}>
            <span className="todo-title">{todo.title}</span>
            <span className={`todo-status ${statusClass}`}>{status}</span>
        </div>
        
        </li>

    );
};
export default TodoItem;