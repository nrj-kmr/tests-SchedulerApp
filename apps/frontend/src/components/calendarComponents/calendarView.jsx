import React, { useState, useEffect, useContext } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import CustomToolbar from './CustomToolbar'
import { fetchTests } from '../../services/apiServices'
import TestModal from '../dialogModals/addTestModal'
import axios from 'axios'
import BoardView from './boardView'
import EditTestModal from '../dialogModals/editTestModal'
import { enIN } from 'date-fns/locale/en-IN'

import { serverURL } from '../../services/apiServices'
import { AuthContext } from '../../context/AuthContext'

const locales = {
    "en-IN": enIN
}
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
});

const CalendarView = ({ department, actualUserDept }) => {
    const { isUserAdmin } = useContext(AuthContext);
    const [tests, setTests] = useState([]);
    const [selectedTest, setSelectedTest] = useState(null);
    const [showCalendar, setShowCalendar] = useState(true);
    const [showBoard, setShowBoard] = useState(false);
    const [activeView, setActiveView] = useState('calendar');

    const [isTestModalOpen, setIsTestModalOpen] = useState(false);
    const [newTest, setNewTest] = useState({ title: '', description: '', department: '', date: '', startTime: '', endTime: '', status: '' });

    const [isEditTestModalOpen, setIsEditTestModalOpen] = useState(false);

    const openEditModal = (test) => {
        setSelectedTest(test);
        setIsEditTestModalOpen(true);
    }

    const closeEditModal = () => {
        setIsEditTestModalOpen(false);
        setSelectedTest(null);
    }

    const handleUpdateTest = (updatedTest) => {
        axios.put(`${serverURL}/api/admin/editTest/${updatedTest._id}`, updatedTest)
            .then((response) => {
                console.log('Test updated successfully:', response.data);
                closeEditModal();
            })
            .catch((error) => {
                console.error('Error updating test:', error);
            });
        closeEditModal();
    }

    const handleSelectSlot = () => {
        setIsTestModalOpen(true);
    };

    const handleSelectEvent = (event) => {
        openEditModal(event);
    };

    useEffect(() => {
        const fetchAllTests = async () => {
            try {
                const response = await fetchTests();

                const fetchedTests = response.data.map(test => {
                    const startDateTime = new Date(test.startTime);
                    const endDateTime = new Date(test.endTime);

                    // Adjust for local timezone offset
                    const timezoneOffset = startDateTime.getTimezoneOffset() * 60000; // offset in milliseconds
                    const startDateTimeLocal = new Date(startDateTime.getTime() + timezoneOffset);
                    const endDateTimeLocal = new Date(endDateTime.getTime() + timezoneOffset);

                    return {
                        ...test,
                        start: startDateTimeLocal,
                        end: endDateTimeLocal
                    };
                });

                setTests(fetchedTests.filter(test => test.department === actualUserDept));
            } catch (error) {
                console.error('Error fetching tests:', error);
            }
        };
        fetchAllTests();
    }, [actualUserDept]);

    const testStyleGetter = (test) => {
        let backgroundColor = ''
        switch (test.status) {
            case 'Scheduled':
                backgroundColor = 'orange';
                break;
            case 'In Progress':
                backgroundColor = 'red';
                break;
            case 'Completed':
                backgroundColor = 'green';
                break;
            case 'Rescheduled':
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
                <div className='flex items-center space-x-4'>

                    <h1 className='flex justify-center items-center bg-green-200 text-green-800 border border-green-400 mb-2 rounded py-2 px-20'>
                        {showCalendar && <span className='text-center'>Calendar for {actualUserDept}</span>}
                        {showBoard && <span className='text-center'>Board for {actualUserDept}</span>}
                    </h1>

                    <div className='flex flex-grow justify-end'>
                        <button
                            className={`border-blue-950 p-2 items-center text-center rounded-l-md mb-2 transition duration-500 ${activeView === 'calendar' ? 'bg-blue-800' : 'bg-blue-700'}`}
                            onClick={() => { setShowCalendar(true); setShowBoard(false); setActiveView('calendar'); }}
                        >Calendar</button>
                        <button
                            className={`border-blue-950 p-2 items-center text-center rounded-r-md mb-2 transition duration-500 ${activeView === 'board' ? 'bg-blue-800' : 'bg-blue-700'}`}
                            onClick={() => { setShowCalendar(false); setShowBoard(true); setActiveView('board'); }}
                        >Board</button>
                    </div>
                </div>
            )}


            {showCalendar && (
                <Calendar
                    defaultView='month'
                    localizer={localizer}
                    events={tests}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: "80vh" }}
                    eventPropGetter={testStyleGetter}
                    components={{
                        toolbar: CustomToolbar
                    }}
                    selectable
                    onSelectSlot={handleSelectSlot}
                    onSelectEvent={handleSelectEvent}
                />
            )}

            {showBoard && (
                <BoardView
                    selectedDepartment={actualUserDept}
                    setTestModal={setIsTestModalOpen}
                    handleEditTest={openEditModal}
                />
            )}

            {selectedTest && (
                <EditTestModal
                    isUserAdmin={isUserAdmin}
                    userDept={actualUserDept}
                    test={selectedTest}
                    isOpen={isEditTestModalOpen}
                    onClose={closeEditModal}
                    onSave={handleUpdateTest}
                />
            )}

            <TestModal
                isUserAdmin={isUserAdmin}
                userDept={actualUserDept}
                isOpen={isTestModalOpen}
                closeModal={() => setIsTestModalOpen(false)}
                newTest={newTest}
                handleInputChange={(e) => setNewTest({ ...newTest, [e.target.name]: e.target.value })}
                handleAddTest={async (formData) => {
                    try {
                        const response = axios.post(`${serverURL}/api/admin/createTest`, formData)
                        console.log("Test Added", (await response).data)
                        setIsTestModalOpen(false);
                    } catch (err) {
                        console.log('Error while adding new test', err)
                    }
                }}
            />
        </div>
    )
}

export default CalendarView