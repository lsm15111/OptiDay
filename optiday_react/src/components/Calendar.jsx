import React, { useEffect, useState } from 'react';
import '../styles/Calendar.css';
import { retrieveAllTodosForUsernameApi } from '../api/TodoApiService';

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

function Calendar({ username }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [loading, setLoading] = useState(true);
    const [allTodos, setAllTodos] = useState([]);

    const handlePrevMonth = () => {
        const prevMonth = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
        setCurrentDate(prevMonth);
    };

    const handleNextMonth = () => {
        const nextMonth = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
        setCurrentDate(nextMonth);
    };

    useEffect(() => {
        const fetchData = async () => {
            retrieveAllTodosForUsernameApi(username)
                .then(response => {
                    setAllTodos(response.data);
                    setLoading(false);
                })
                .catch(error => console.error(error));
        };
        fetchData();
    }, [username]);

    const monthDates = getMonthDates(currentDate.getFullYear(), currentDate.getMonth());
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const categoryColors = [
        { id: 1, color: '#FFB3BA' }, // Pastel Red
        { id: 2, color: '#FFDFBA' }, // Pastel Orange
        { id: 3, color: '#FFFFBA' }, // Pastel Yellow
        { id: 4, color: '#BAFFC9' }, // Pastel Green
        { id: 5, color: '#BAE1FF' }, // Pastel Blue
        { id: 6, color: '#E2BAFF' }, // Pastel Purple
        { id: 7, color: '#FFC4E1' }, // Pastel Pink
        { id: 8, color: '#B3E5FC' }, // Light Blue
        { id: 9, color: '#C8E6C9' }, // Light Green
        { id: 10, color: '#FFF9C4' }, // Light Yellow
        { id: 11, color: '#D1C4E9' }  // Light Purple
    ];

    if (loading) return (<div>로딩중 ...</div>);

    return (
        <div className='calendar-container'>
            <div className="month-navigation">
                <button className="nav-button" onClick={handlePrevMonth}>&lt;</button>
                <div className="month-name m-2">{currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월</div>
                <button className="nav-button" onClick={handleNextMonth}>&gt;</button>
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
                    {monthDates.map((date, index) => (
                        <div key={index} className="day">
                            {date && <div className="date-number">{date.getDate()}</div>}
                            <div className='pt-3'>{date && allTodos
                                .sort((a, b) => {
                                    const aDuration = new Date(a.endDate) - new Date(a.startDate);
                                    const bDuration = new Date(b.endDate) - new Date(b.startDate);
                                    return bDuration - aDuration;
                                })
                                .map((allTodo, todoIdx) => {
                                    const eventStartDate = new Date(allTodo.startDate);
                                    eventStartDate.setHours(0, 0, 0, 0); // 시간을 0시 0분 0초로 설정

                                    const eventEndDate = new Date(allTodo.endDate);
                                    eventEndDate.setHours(0, 0, 0, 0); // 시간을 0시 0분 0초로 설정

                                    if (date >= eventStartDate && date <= eventEndDate) { 
                                        const eventColor = categoryColors.find(color => color.id === allTodo.category)?.color || '#FFECB3';
                                        return (
                                            <div key={todoIdx} className="event" style={{ backgroundColor: eventColor }}>
                                                {allTodo.title}
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                                </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Calendar;