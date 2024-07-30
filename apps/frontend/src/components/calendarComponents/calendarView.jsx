import React, { useState, useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import axios from 'axios'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import CustomToolbar from './CustomToolbar'

const localizer = momentLocalizer(moment)



const CalendarView = ({ department, tests }) => {
    const [events, setEvents] = useState([]);

    const getEventsForDepartment = (department) => {
        const allTests = events.map(event => ({
            start: moment(event.start).toDate(),
            end: moment(event.end).toDate(),
            title: event.title,
            department: event.department,
            status: event.status,
        }));
        
        return allEvents.filter(event => event.department === department)
    }
    useEffect(() => {
        axios.get('http://localhost:8000/api/admin/getTests')
            .then((response) => setEvents(response.data))
            .catch((error) => console.error('Error fetching tests:', error));
    }, []);
    const [departments, setDepartments] = useState([]);

    const showTests = () => {
        axios.get('http://localhost:8000/api/admin/getTests')
            .then((response) => setEvents(response.data))
            .catch((error) => console.error('Error fetching tests:', error));
    }

    useEffect(() => {
        axios.get('http://localhost:8000/api/admin/getDepartments')
           .then((response) => setDepartments(response.data))
           .catch((error) => console.error('Error fetching departments:', error));
     }, []);

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
                    <span className='text-center'>Calendar for {department}</span>
                </h1>
            )}

            <Calendar
                defaultView='month'
                localizer={localizer}
                events={tests}
                startAccessor="start"
                endAccessor="end"
                min={moment("2024-07-27T09:00:00").toDate()}
                max={moment("2024-07-27T19:00:00").toDate()}
                style={{ height: "80vh" }}
                eventPropGetter={eventStyleGetter}
                components={{
                    toolbar: CustomToolbar
                }}
            />
        </div>
    )
}

export default CalendarView