import React, { useState, useEffect } from "react";
import { getMonthDays, isToday, isSameDay } from "../utils/dateUtils";
import EventModal from "./EventModal";
import EventList from "./EventList";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]); // Store events keyed by ISO string

  // Load events from localStorage on mount
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events"));
    if (storedEvents) {
      setEvents(storedEvents);
    }
  }, []);

  // Save events to localStorage when events state changes
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const days = getMonthDays(currentDate.getFullYear(), currentDate.getMonth());

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const addEvent = (date, event) => {
    const dateKey = date.toISOString();
    const updatedEvents = {
      ...events,
      [dateKey]: [...(events[dateKey] || []), event],
    };
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };
  
  const editEvent = (date, index, updatedEvent) => {
    const dateKey = date.toISOString();
    const updatedEvents = { ...events };
    updatedEvents[dateKey][index] = updatedEvent;
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };
  
  const deleteEvent = (date, index) => {
    const dateKey = date.toISOString();
    const updatedEvents = { ...events };
    updatedEvents[dateKey].splice(index, 1);
    if (updatedEvents[dateKey].length === 0) {
      delete updatedEvents[dateKey]; // Remove date key if no events remain
    }
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };
  
  return (
    <div className="calendar-container">
      <div className="calendar">
        <header>
          <h2 className="month">
            {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
          </h2>
        </header>
        <div className="grid"> 
        {days.map(({ date, dayName }) => (
          <div
            key={date.toISOString()}
            className={`day ${isToday(date) ? "today" : ""} ${
              isSameDay(date, selectedDate) ? "selected" : ""
            }`}
            onClick={() => setSelectedDate(date)}
          >
            <div className="date-number">{date.getDate()}</div>
            <div className="date-day">{dayName}</div>
          </div>
        ))}
        </div>
        <div className="button">
          <button onClick={handlePrevMonth}>Previous</button>
          <button onClick={handleNextMonth}>Next</button>
        </div>
      </div>
      <EventList events={Object.values(events).flat()} />
      {selectedDate && (
        <EventModal
          date={selectedDate}
          events={events[selectedDate.toISOString()] || []}
          addEvent={addEvent}
          deleteEvent={deleteEvent}
          closeModal={() => setSelectedDate(null)}
        />
      )}
    </div>
  );
};

export default Calendar;
