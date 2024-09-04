import React, { useEffect, useState } from 'react';
import { fetchTests } from '../../services/apiServices';

const BoardView = ({ selectedDepartment, setTestModal, handleEditTest }) => {
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
               {sections.map((section) => {
                    const sectionTests = filterTestsByStatus(section);
                    const maxHeight = sectionTests.length > 0 ? '300px' : '160px';
                    return (
                         <div key={section} className="w-1/4 bg-gray-100 p-4 rounded shadow-md flex flex-col" style={{ maxHeight }}>
                              <h2 className="text-lg font-bold mb-4 text-black text-center">{section}</h2>
                              <hr className='pb-2' />
                              <div className="space-y-2 flex-grow overflow-y-auto mb-4">
                                   {sectionTests.length > 0 ? (
                                        sectionTests.map((test) => (
                                             <div
                                                  key={test._id}
                                                  onClick={() => handleEditTest(test)}
                                                  className="bg-gray-50 text-black p-2 rounded cursor-pointer hover:bg-gray-200 transition-all duration-300"
                                             >
                                                  <h3 className="text-lg font-bold">{test.title}</h3>
                                                  <p>{test.description}</p>
                                             </div>
                                        ))
                                   ) : (
                                        <p className="text-gray-500 text-center">No tests here</p>
                                   )}
                              </div>
                              <button
                                   onClick={() => setTestModal(true)}
                                   className='bg-indigo-200 mt-auto w-full text-center text-indigo-600 px-2 py-1 rounded border border-indigo-100 hover:bg-indigo-100 hover:text-indigo-800 transition-all duration-300'
                              >
                                   + Add Test
                              </button>
                         </div>
                    );
               })}
          </div>
     );
}

export default BoardView;