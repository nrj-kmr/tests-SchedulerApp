import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import CustomToolbar from './CustomToolbar'

const localizer = momentLocalizer(moment)

const CalendarView = ({ department }) => {
    const [events, setEvents] = useState(getEventsForDepartment(department));
    const [showForm, setShowForm] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleSelectSlot = ({ start }) => {
        setSelectedDate(start);
        setShowForm(true);
    };

    const handleEventSubmit = (newEvent) => {
        // send POST request to backendAPI and update events list
        fetch('/api/tests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newEvent),
        })
            .then(response => response.json())
            .then(data => {
                setEvents([...events, data]);
                setShowForm(false);
            })
            .catch((error) => console.error('Error:', error));
    }

    const eventStyleGetter = (event) => {
        let backgroundColor = ''
        switch (event.status) {
            case 'done':
                backgroundColor = 'green';
                break;
            case 'not done':
                backgroundColor = 'red';
                break;
            case 'pending':
                backgroundColor = 'yellow';
                break;
            case 'ongoing':
                backgroundColor = 'orange';
                break;
            default:
                backgroundColor = 'blue';
        }
        let style = {
            backgroundColor: backgroundColor,
            borderRadius: '0px',
            border: 'none',
            color: 'white',
            display: 'block'
        }
        return {
            style: style
        }
    }

    return (
        <div>
            {department === 'default' || !department ? (
                <h1 className='flex justify-center items-center bg-yellow-200 text-yellow-800 border border-yellow-400 mb-2 rounded p-2'>
                    <span className='text-center'>Please choose a department</span>
                </h1>
                ) : (
                    <h1 className='flex justify-center items-center bg-green-200 text-green-800 border border-green-400 mb-2 rounded p-2'>
                    <span className='text-center'>{department}</span>
                </h1>
                 )}

            <Calendar
                defaultView='week'
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                min={moment("2024-07-27T09:00:00").toDate()}
                max={moment("2024-07-27T19:00:00").toDate()}
                style={{ height: "80vh" }}
                // selectable
                onSelectSlot={handleSelectSlot}
                eventPropGetter={eventStyleGetter}
                components={{
                    toolbar: CustomToolbar
                }}
            />
            {showForm && (
                <EventForm
                    date={selectedDate}
                    onSubmit={handleEventSubmit}
                    onClose={() => setShowForm(false)}
                />
            )}
        </div>
    )
}

const getEventsForDepartment = (department) => {
    const allEvents = [
        {
            start: moment("2024-07-27T16:00:00").toDate(),
            end: moment("2024-07-27T18:00:00").toDate(),
            title: 'Meeting with the boss',
            department: 'Department01',
            status: 'pending',
        },
        {
            start: moment("2024-07-27T10:00:00").toDate(),
            end: moment("2024-07-27T12:00:00").toDate(),
            title: 'Meeting with the team',
            department: 'Dept 02',
            status: 'done',
        },
        {
            start: moment("2024-07-27T14:00:00").toDate(),
            end: moment("2024-07-27T16:00:00").toDate(),
            title: 'Meeting with the client',
            department: 'Dept 03',
            status: 'not done',
        },
        {
            start: moment("2024-07-27T08:00:00").toDate(),
            end: moment("2024-07-27T10:00:00").toDate(),
            title: 'Meeting with the manager',
            department: 'Dept 04',
            status: 'ongoing',
        },
    ]

    return allEvents.filter(event => event.department === department)
}

export default CalendarView