
function Calendar(){
    const days = ["27", "28", "29", "30", "31", "1", "2"];
    const timeSlots = Array.from({ length: 19 }, (_, i) => `${i + 6}:00`);

    // 목데이터
    const events = [
    { day: 0, time: "18:00", title: "저녁약속" },
    { day: 0, time: "17:00", title: "공부" },
    { day: 1, time: "7:00", title: "운동" },
    { day: 2, time: "18:00", title: "저녁약속" },
    { day: 3, time: "7:00", title: "BOJ_25991" },
    { day: 4, time: "9:00", title: "서울" },
    ];
    return(
        <div className="calendar p-3 rounded">
            
                <div className="row calendar">
                    <div className="col-1"></div>
                    {days.map((day, index) => (
                        <div key={index} className="col day-header">
                        {day}
                        </div>
                    ))}
                    </div>

                <div className="row calendar">

                {/* Time Slots */}
                <div className="col-1 time-column">
                    {timeSlots.map((time, index) => (
                    <div key={index} className="time-slot">
                        {time}
                    </div>
                    ))}
                </div>
                {/* Day 컬럼 */}
                {days.map((_, dayIndex) => (
                    <div key={dayIndex} className="col day-column">
                    {timeSlots.map((time, timeIndex) => (
                        <div key={timeIndex} className="time-slot"></div>
                    ))}
                    {events
                        .filter((event) => event.day === dayIndex)
                        .map((event, eventIndex) => (
                        <div
                            key={eventIndex}
                            className="event"
                            style={{
                            top: `${
                                timeSlots.indexOf(event.time) * 40 + 5
                            }px`,
                            }}
                        >
                            {event.title}
                        </div>
                        ))}
                    </div>
                ))}
                </div>

        </div>
    )
}
export default Calendar