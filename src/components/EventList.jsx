import React from "react";

const EventList = ({ events }) => {
  const formattedEvents = events.map((event, index) => {
    const eventDate = new Date(events.date); // Ensure it's a Date object
    const formattedDate = eventDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return (
      <li key={index}>
        {event.name} ({event.startTime} - {event.endTime})
        {event.description && `: ${event.description}`}
      </li>
    );
  });

  return (
    <div className="event-list">
      <h2>All Events</h2>
      <ul>
        {events.length > 0 ? formattedEvents : <p>No events available</p>}
      </ul>
    </div>
  );
};

export default EventList;
