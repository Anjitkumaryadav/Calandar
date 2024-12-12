import React, { useState } from "react";
import Calendar from "./components/Calandar";
import { useLocalStorage } from "./hooks/useLocalStorage";


const App = () => {
  const [events, setEvents] = useLocalStorage("calendar-events", {});

  const addEvent = (date, event) => {
    const dateString = date.toISOString().split("T")[0];
    setEvents({
      ...events,
      [dateString]: [...(events[dateString] || []), event],
    });
  };

  const deleteEvent = (date, index) => {
    const dateString = date.toISOString().split("T")[0];
    const updatedEvents = [...(events[dateString] || [])];
    updatedEvents.splice(index, 1);
    setEvents({
      ...events,
      [dateString]: updatedEvents,
    });
  };


  return (
    <div className="container">
      <h1>Calendar</h1>
      <Calendar events={events} addEvent={addEvent} deleteEvent={deleteEvent} />
    </div>
  );
};

export default App;
