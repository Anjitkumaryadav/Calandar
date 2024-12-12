export function getMonthDays(year, month) {
    const date = new Date(year, month, 1);
    const days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; // Day names array
  
    while (date.getMonth() === month) {
        days.push({
            date: new Date(date), // Date object
            dayName: dayNames[date.getDay()] // Corresponding day name
        });
        date.setDate(date.getDate() + 1);
    }
  
    return days;
}

export function isSameDay(date1, date2) {
    if (!date1 || !(date1 instanceof Date) || !date2 || !(date2 instanceof Date)) {
        return false; // Ensure both inputs are valid Date objects
    }
    return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
    );
}

export function isToday(date) {
    if (!date || !(date instanceof Date)) {
        return false; // Ensure the input is a valid Date object
    }
    return isSameDay(date, new Date());
}
