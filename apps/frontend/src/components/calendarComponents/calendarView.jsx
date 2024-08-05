import React, { useState, useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import CustomToolbar from './CustomToolbar'
import { fetchTests } from '../../services/apiServices'
import TestModal from '../dialogModals/addTestModal'
import axios from 'axios'

const localizer = momentLocalizer(moment)

const CalendarView = ({ department, actualUserDept }) => {
    const [tests, setTests] = useState([]);
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });
    const [selectedTest, setSelectedTest] = useState(null);

    const [isTestModalOpen, setIsTestModalOpen] = useState(false);
    const [newTest, setNewTest] = useState({ title: '', description: '', department: '', date: '', startTime: '', endTime: '', status: '' });

    const handleRightClick = (e, test) => {
        e.preventDefault();
        setSelectedTest(test);
        setContextMenu({ visible: true, x: e.clientX, y: e.clientY });
    }

    useEffect(() => {
        const fetchAllTests = async () => {
            try {
                const response = await fetchTests();
                const fetchedTests = response.data.map(test => ({
                    ...test,
                    start: new Date(test.startTime),
                    end: new Date(test.endTime)
                }))
                setTests(fetchedTests.filter(test => test.department === actualUserDept));
            } catch (error) {
                console.error('Error fetching tests:', error);
            }
        }
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
        <div onContextMenu={(e) => handleRightClick(e, null)}>
            {department === '' || !department ? (
                <h1 className='flex justify-center items-center bg-yellow-200 text-yellow-800 border border-yellow-400 mb-2 rounded p-2'>
                    <span className='text-center'>No Department Found for this user</span>
                </h1>
            ) : (
                <div className='flex items-center space-x-4'>

                    <h1 className='flex justify-center items-center bg-green-200 text-green-800 border border-green-400 mb-2 rounded py-2 px-20'>
                        <span className='text-center'>Calendar for {actualUserDept}</span>
                    </h1>

                    <div className='flex flex-grow space-x-2 justify-end'>
                        <button className='border-blue-950 p-2 items-center text-center rounded-md bg-blue-700 hover:bg-blue-800 mb-2'>Calendar View</button>
                        <button className='border-blue-950 p-2 items-center text-center rounded-md bg-blue-700 hover:bg-blue-800 mb-2'>Board View</button>
                    </div>

                </div>
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

            {contextMenu.visible && (
                <div
                    className='fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 z-50'
                    onClick={() => { setContextMenu({ visible: false, x: 0, y: 0 }); setSelectedTest(null); }}
                >
                    <div
                        className='fixed bg-slate-700 border border-slate-900 rounded shadow-md z-50'
                        style={{ top: contextMenu.y, left: contextMenu.x }}
                    >
                        <ul className='list-none p-0 m-0'>
                            {selectedTest ? (
                                <>
                                    <li>
                                        <h1 className='p-2 text-lg cursor-pointer hover:bg-slate-800 transition-colors duration-300'>
                                            Edit Test
                                        </h1>
                                    </li>
                                    <li>
                                        <h1 className='p-2 text-lg text-red-400 cursor-pointer hover:bg-slate-800 transition-colors duration-300'>
                                            Delete Test
                                        </h1>
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <h1
                                        className='p-2 text-lg cursor-pointer hover:bg-slate-800 transition-colors duration-300'
                                        onClick={() => setIsTestModalOpen(true)}
                                    >
                                        Add Test
                                    </h1>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            )}

            <TestModal
                isOpen={isTestModalOpen}
                closeModal={() => setIsTestModalOpen(false)}
                newTest={newTest}
                handleInputChange={(e) => setNewTest({ ...newTest, [e.target.name]: e.target.value })}
                handleAddTest={async (formData) => {
                    try {
                        const response = axios.post('http://localhost:8000/api/admin/createTest', formData)
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