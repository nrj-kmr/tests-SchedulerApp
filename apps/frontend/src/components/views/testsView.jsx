import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const TestsView = ({ tests, setIsTestModalOpen, handleEditTest }) => {
  const generatePDFReport = () => {
    const doc = new jsPDF();
    const sortedTests = [...tests].sort((a, b) => {
      if (a.status < b.status) return -1;
      if (a.status > b.status) return 1;
      if (a.department < b.department) return -1;
      if (a.department > b.department) return 1;
      return 0;
    });

    const tableColumn = ["#", "Title", "Department", "Date", "Status"];
    const tableRows = [];

    sortedTests.forEach((test, index) => {
      const testData = [
        index + 1,
        test.title,
        test.department,
        test.date.split('T')[0],
        test.status
      ];
      tableRows.push(testData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      theme: 'grid',
    });

    doc.text("Tests Report", 14, 15);
    doc.save("tests_report.pdf");
  };

  return (
    <div>
      <div className="sticky top-0 z-0">
        <h1 className='flex flex-grow justify-center font-bold text-2xl'>Tests List</h1>
        <div className="flex justify-end mb-4 space-x-2">
          <button
            className="shadow-lg px-2 rounded bg-gray-600 hover:bg-gray-700"
            onClick={generatePDFReport}
          >
            Download Report
          </button>
          <button
            className='bg-blue-600 text-white px-2 py-1 rounded shadow-lg hover:bg-blue-700'
            onClick={() => {
              setIsTestModalOpen(true);
            }}
          >
            Add Test
          </button>
        </div>
      </div>

      <div className="overflow-y-auto max-h-[calc(100vh-200px)] bg-slate-600 rounded-lg">
        {tests.length === 0 ? (
          <p>No tests available</p>
        ) : (
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b font-bold text-left">#</th>
                <th className="py-2 px-4 border-b font-bold text-left">Title</th>
                <th className="py-2 px-4 border-b font-bold text-left">Department</th>
                <th className="py-2 px-4 border-b font-bold text-left">Date</th>
                <th className="py-2 px-4 border-b font-bold text-left">Start Time</th>
                <th className="py-2 px-4 border-b font-bold text-left">End Time</th>
                <th className="py-2 px-4 border-b font-bold text-left">Status</th>
                <th className="py-2 px-4 border-b font-bold text-left"></th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test, index) => (
                <tr key={test._id}>
                  <td className="py-1 px-4 border-b border-gray-500">{index + 1}</td>
                  <td className="py-1 px-4 border-b border-gray-500">{test.title}</td>
                  <td className="py-1 px-4 border-b border-gray-500">{test.department}</td>
                  <td className="py-1 px-4 border-b border-gray-500">{test.date.split('T')[0]}</td>
                  <td className="py-1 px-4 border-b border-gray-500">{test.startTime.split('T')[1].split('.')[0]}</td>
                  <td className="py-1 px-4 border-b border-gray-500">{test.endTime.split('T')[1].split('.')[0]}</td>
                  <td className="py-1 px-4 border-b border-gray-500">{test.status}</td>
                  <td className="py-1 px-4 border-b border-gray-500">
                    <div className="flex space-x-2 justify-end">
                      <button className='bg-green-600 text-white px-2 py-1 rounded shadow-md hover:bg-green-700' onClick={() => handleEditTest(test)}>Edit</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TestsView;