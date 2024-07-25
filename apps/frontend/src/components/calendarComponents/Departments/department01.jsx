import React from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";

const localizer = momentLocalizer(moment);

const Department01 = ({ selectedDepartment, events }) => {
  // Assuming events have a 'department' field for filtering
  const filteredEvents = events.filter(event => event.department === selectedDepartment);

  return (
    <div>
      <h1>Department 01</h1>
      <Calendar
        defaultView="week"
        views={['month', 'week', 'day']}
        localizer={localizer}
        events={filteredEvents}
        startAccessor="start"
        endAccessor="end"
        min={moment("2024-07-24T09:00:00").toDate()}
        max={moment("2024-07-24T19:00:00").toDate()}
        style={{ height: "80vh" }}
      />
    </div>
  );
}

export default Department01;
