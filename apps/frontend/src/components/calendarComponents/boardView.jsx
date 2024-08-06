import React, { useEffect, useState } from 'react';
import { fetchTests } from '../../services/apiServices';

const BoardView = ({ selectedDepartment }) => {
     const [tests, setTests] = useState([]);
     const sections = ['Scheduled', 'In Progress', 'Completed', 'Rescheduled'];

     useEffect(() => {
          const fetchAllTests = async () => {
               try {
                    const response = await fetchTests();
                    const fetchedTests = response.data.map(test => ({
                         ...test,
                         start: new Date(test.startTime),
                         end: new Date(test.endTime)
                    }))
                    setTests(fetchedTests.filter(test => test.department === selectedDepartment));
               } catch (error) {
                    console.error('Error fetching tests:', error);
               }
          }
          fetchAllTests();
     }, [selectedDepartment]);

     const filterTestsByStatus = (status) => {
          return tests.filter(test => test.status === status);
     }

     return (
          <div className="flex space-x-4 p-4">
               {sections.map((section) => (
                    <div key={section} className="w-1/4 bg-gray-100 p-4 rounded shadow-md">
                         <h2 className="text-lg font-bold mb-4 text-black">{section}</h2>
                         <div className="space-y-2">
                              {filterTestsByStatus(section).map((test) => (
                                   <div key={test._id} className="bg-white text-black p-2 rounded shadow-md cursor-pointer">
                                        <h3 key={test.title} className="text-lg font-bold">{test.title}</h3>
                                        <p key={test.description}>{test.description}</p>
                                   </div>
                              ))}
                         </div>
                    </div>
               ))}
          </div>
     );
}

export default BoardView;