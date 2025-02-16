import React, { useState } from 'react';
import '../styles/Calendar.css';
import DayTodosModal from './modals/DayTodosModal';
import { ChevronLeftIcon, ChevronRightIcon, CirclePlus } from 'lucide-react';
import TodoModal from './modals/TodoModal';
import { useSelector } from 'react-redux';

function getMonthDates(year, month) {
    const date = new Date(year, month, 1);
    const dates = [];
    const firstDayIndex = date.getDay();
    for (let i = 0; i < firstDayIndex; i++) {
        dates.push(null);
    }
    while (date.getMonth() === month) {
        dates.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return dates;
}

function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function Calendar(){
    const todos = useSelector(state => state.todos.todos);
    const categories = useSelector(state => state.categories.categories);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [modalOpen, setModalOpen] = useState(false);
    const [filterDate, setFilterDate] = useState([]);
    
    const handlePrevMonth = () => {
        const prevMonth = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
        setCurrentDate(prevMonth);
    };

    const handleNextMonth = () => {
        const nextMonth = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
        setCurrentDate(nextMonth);
    };

    const handleDayClick = (date) => {
        if (modalOpen) return; // 모달이 열려 있으면 아무 작업도 하지 않음
        const formattedClickDate = formatDateToYYYYMMDD(date);
        setFilterDate(formattedClickDate);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const monthDates = getMonthDates(currentDate.getFullYear(), currentDate.getMonth());
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

    function renderDays(){
        // 각 todo의 일수 계산 후 정렬
    const sortedTodos = todos
    .map(todo => {
        const startDate = new Date(todo.startDate);
        const endDate = new Date(todo.endDate);
        const duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)); // 일수 계산
        return { ...todo, duration }; // todo에 duration 추가
    })
    .sort((a, b) => b.duration - a.duration); // 긴 일정이 위에 오도록 정렬
        return monthDates.map((date, index) => {
            const isSunday = date && new Date(date).getDay() === 0; // Check if the day is Sunday
            const formattedDate = date ? formatDateToYYYYMMDD(date) : null;
            return (
                <div key={index} className={`day ${isSunday ? 'sunday' : ''}`} onClick={() => date && handleDayClick(date)}>
                    {date && <div className="date-number" style={{ color: isSunday ? '#FF9999' : '#444' }}>{date.getDate()}</div>}
                    <div className='pt-3' style={{ maxHeight: '100px' }}>
                        {formattedDate && sortedTodos
                            .filter(todo => formattedDate >= todo.startDate && formattedDate <= todo.endDate)
                            .map((todo, todoIdx) => {
                                const eventColor = Array.isArray(categories) ? categories.find(category => category.id === todo.categoryId)?.color : '#ddd';
                                return (
                                    <div key={todoIdx} className="event" style={{ backgroundColor: eventColor }}>
                                        {todo.title}
                                    </div>
                                );
                            })
                            .slice(0, 4) // Show only up to 4 todos
                        }
                    </div>
                </div>
            );
        });
    };

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const closeCreateModal = () => {
        setIsCreateOpen(false);
    };
    const handleCreateClick = () => {
        if (isCreateOpen) return;
        setIsCreateOpen(true);
    };

    return (
        <div className='calendar-container'>
            <DayTodosModal date={filterDate} isOpen={modalOpen} onClose={closeModal} categories={categories} />
            <TodoModal isOpen={isCreateOpen} onClose={closeCreateModal} />
            
            <CirclePlus size={50} className="circle-plus" onClick={handleCreateClick} />
            <div className="month-navigation">
                <button className="nav-button" onClick={handlePrevMonth}><ChevronLeftIcon size={20}></ChevronLeftIcon></button>
                <div className="month-name m-2">{currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월</div>
                <button className="nav-button" onClick={handleNextMonth}><ChevronRightIcon size={20}></ChevronRightIcon></button>
            </div>
            <div className="calendar">
                <div className="header">
                    {daysOfWeek.map((day, index) => (
                        <div key={index} className="day-name" style={{ color: day === '일' ? '#FF9999' : 'inherit' }}>
                            {day}
                        </div>
                    ))}
                </div>
                <div className="month">
                    {renderDays()}
                </div>
            </div>
        </div>
    );
}

export default Calendar;