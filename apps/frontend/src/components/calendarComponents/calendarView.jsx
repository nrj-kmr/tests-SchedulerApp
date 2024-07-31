import React, { useState, useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import axios from 'axios'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import CustomToolbar from './CustomToolbar'

const localizer = momentLocalizer(moment)

const CalendarView = ({ department, actualUserDept }) => {
    const [tests, setTests] = useState([]);

    const getTestsForDepartment = (department) => {
        return tests.filter(test => test.department === department);
    }

    // display the tests in the calendar to the userDashboard filtered by department
    useEffect(() => {
        const fetchTests = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/admin/getTests');
                setTests(response.data.filter(test => test.department === actualUserDept));
            } catch (error) {
                console.error('Error fetching tests:', error);
            }
        }
    }, [actualUserDept]);

    const testStyleGetter = (test) => {
        let backgroundColor = ''
        switch (test.status) {
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
    };

    return (
        <div>
            {department === '' || !department ? (
                <h1 className='flex justify-center items-center bg-yellow-200 text-yellow-800 border border-yellow-400 mb-2 rounded p-2'>
                    <span className='text-center'>No Department Found for this user</span>
                </h1>
            ) : (
                <h1 className='flex justify-center items-center bg-green-200 text-green-800 border border-green-400 mb-2 rounded p-2'>
                    <span className='text-center'>Calendar for {actualUserDept}</span>
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
                eventPropGetter={testStyleGetter}
                components={{
                    toolbar: CustomToolbar
                }}
            />
        </div>
    )
}

export default CalendarView