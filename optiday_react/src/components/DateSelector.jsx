const generateYears = () => Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
const generateMonths = () => Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();

const DateSelector = ({ value, onChange }) => {
    const [year, month, day] = (value || '').split('-');
    
    return (
        <div className="date-selector me-3">
            <select 
                className="form-select year-select"
                style={{ width: '120px' }}
                value={year || ''}
                onChange={(e) => onChange('year', e.target.value)}
            >
                <option value="">년도</option>
                {generateYears().map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
            <select 
                className="form-select month-select"
                style={{ width: '90px' }}
                value={month || ''}
                onChange={(e) => onChange('month', e.target.value)}
            >
                <option value="" >월</option>
                {generateMonths().map(month => (
                    <option key={month} value={month}>{parseInt(month)}월</option>
                ))}
            </select>
            <select 
                className="form-select day-select"
                style={{ width: '90px' }}
                value={day || ''}
                onChange={(e) => onChange('day', e.target.value)}
            >
                <option value="">일</option>
                {Array.from(
                    { length: getDaysInMonth(year, month) || 31 },
                    (_, i) => String(i + 1).padStart(2, '0')
                ).map(day => (
                    <option key={day} value={day}>{parseInt(day)}일</option>
                ))}
            </select>
        </div>
    );
};

export default DateSelector;