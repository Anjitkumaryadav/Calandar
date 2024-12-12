import React, { useState } from "react";

const EventModal = ({ date, events, addEvent, editEvent, deleteEvent, closeModal }) => {
  const [eventName, setEventName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddEvent = () => {
    if (eventName.trim() !== "" && startTime && endTime) {
      const newEvent = { name: eventName, startTime, endTime, description };
      if (editingIndex !== null) {
        editEvent(date, editingIndex, newEvent);
      } else {
        addEvent(date, newEvent);
      }
      resetForm();
    }
  };

  const resetForm = () => {
    setEventName("");
    setStartTime("");
    setEndTime("");
    setDescription("");
    setEditingIndex(null);
  };

  const handleEdit = (index) => {
    const event = events[index];
    setEventName(event.name);
    setStartTime(event.startTime);
    setEndTime(event.endTime);
    setDescription(event.description);
    setEditingIndex(index);
  };

  return (
    <div className="modal">
      <h2>Events on {date.toDateString()}</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            <strong>{event.name}</strong> ({event.startTime} - {event.endTime})
            {event.description && <p>{event.description}</p>}
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => deleteEvent(date, index)}>Delete</button>
          </li>
        ))}
      </ul>

      <input
        type="text"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
        placeholder="Event name"
      />
      <input
        type="time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <input
        type="time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Optional description"
      />
      <button onClick={handleAddEvent}>{editingIndex !== null ? "Update Event" : "Add Event"}</button>
      <button onClick={resetForm}>Reset</button>
      <button onClick={closeModal}>Close</button>
    </div>
  );
};

export default EventModal;
