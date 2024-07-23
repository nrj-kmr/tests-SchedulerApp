import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

// Some sample events
const events = [
    {
        id: 0,
        title: 'Meeting with Bob',
        allDay: false,
        start: new Date(2024, 6, 1, 10, 0), // 2024-07-01 10:00 AM
        end: new Date(2024, 6, 1, 11, 0),   // 2024-07-01 11:00 AM
    },
    {
        id: 1,
        title: 'Lunch with Sarah',
        allDay: false,
        start: new Date(2024, 6, 2, 12, 0), // 2024-07-02 12:00 PM
        end: new Date(2024, 6, 2, 13, 0),   // 2024-07-02 1:00 PM
    },
    {
        id: 2,
        title: 'Project Deadline',
        allDay: true,
        start: new Date(2024, 6, 5),        // 2024-07-05
        end: new Date(2024, 6, 6),          // 2024-07-06
    },
];

const MyCalendar = () => {
    return (
        <div className="bg-slate-800 min-h-screen text-white flex flex-col items-center py-10">
            <h2 className="text-2xl font-bold mb-6">Schedules</h2>
            <div className="w-full max-w-4xl bg-slate-400 p-4 m-2 rounded-md shadow-lg">
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: '100%' }}
                    views={['month', 'week', 'day', 'agenda']}  // Available views
                    defaultView='month'
                    showMultiDayTimes={true}  // Show multi-day events
                    components={{
                        event: ({ event }) => (
                            <span>
                                <strong>{event.title}</strong>
                            </span>
                        ),
                    }}
                    eventPropGetter={(event) => ({
                        style: {
                            backgroundColor: '#3174ad',
                            color: 'white',
                            borderRadius: '5px',
                            opacity: 0.8,
                        },
                    })}
                    formats={{
                        dayFormat: 'ddd M/DD', // Customize the format of day display
                        agendaDateFormat: 'M/DD',
                    }}
                />
            </div>
        </div>
    )
}

export default MyCalendar;