import React, { useEffect, useState } from 'react';
import '../styles/Calendar.css';
import { useAuth } from '../context/AuthContext';
import {  useTodo } from '../context/TodoContext';
import DayTodosModal from './modals/DayTodosModal';
import { ChevronLeftIcon, ChevronRightIcon, CirclePlus } from 'lucide-react';
import TodoModal from './modals/TodoModal';

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

function Calendar() {

    const {todos, categories} = useTodo();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [modalOpen, setModalOpen] = useState(false);
    const [filteredTodos, setFilteredTodos] = useState([]);
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
        const ClickDate = new Date(date);
        ClickDate.setHours(0, 0, 0, 0); // 시간을 0시로 설정
        const todosForDay = todos.filter(todo => {
            const todoStartDate = new Date(todo.startDate).setHours(0, 0, 0, 0);
            const todoEndDate = new Date(todo.endDate).setHours(0, 0, 0, 0); // endDate를 오늘 모두포함
            return todoStartDate <= ClickDate && todoEndDate >= ClickDate;
        });
        setFilteredTodos(todosForDay);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const monthDates = getMonthDates(currentDate.getFullYear(), currentDate.getMonth());
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];


    const renderDays = () => {
        return monthDates.map((date, index) => {
            const isSunday = date && new Date(date).getDay() === 0; // Check if the day is Sunday
            return (
                <div key={index} className={`day ${isSunday ? 'sunday' : ''}`} onClick={() => date && handleDayClick(date)}> {/* Apply class if it's Sunday */}
                    {date && <div className="date-number" style={{ color: isSunday ? '#FF9999' : '#444' }}>{date.getDate()}</div>}
                    <div className='pt-3' style={{ maxHeight: '100px' }}>{date && todos
                        .sort((a, b) => {
                            const aDuration = new Date(a.endDate) - new Date(a.startDate);
                            const bDuration = new Date(b.endDate) - new Date(b.startDate);
                            return bDuration - aDuration;
                        })
                        .map((todo, todoIdx) => {
                            const eventStartDate = new Date(todo.startDate);
                            eventStartDate.setHours(0, 0, 0, 0); // 시간을 0시 0분 0초로 설정

                            const eventEndDate = new Date(todo.endDate);
                            eventEndDate.setHours(0, 0, 0, 0); // 시간을 0시 0분 0초로 설정

                            if (date >= eventStartDate && date <= eventEndDate) { 
                                const eventColor = Array.isArray(categories) ? categories.find(category => category.id === todo.categoryId)?.color : '#ddd';
                                return (
                                    <div key={todoIdx} className="event" style={{ backgroundColor: eventColor }}>
                                        {todo.title}
                                    </div>
                                );
                            }
                            return null;
                        })
                        .filter(item => item !== null)
                        .slice(0, 4) // todo 3개만 보여주기
                        
                        
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
        setIsCreateOpen(true);
    };

    return (
        <div className='calendar-container'>
            <DayTodosModal todos={filteredTodos} onClose={closeModal} isOpen={modalOpen} />
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