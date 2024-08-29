import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../components/topbar';
import CalendarView from '../components/calendarComponents/calendarView';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import TestsView from './views/testsView';
import { ApiContext } from '../context/ApiContext';
import EditTestModal from './dialogModals/editTestModal';
import TestModal from './dialogModals/addTestModal';

import { serverURL } from '../services/apiServices';

const UserDashboard = ({ }) => {
  const [exactDepartment, setExactDepartment] = useState('');
  const [selectedView, setSelectedView] = useState('calendar');

  const [selectedTest, setSelectedTest] = useState(null);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [isTestEditModalOpen, setIsTestEditModalOpen] = useState(false);

  const [newTest, setNewTest] = useState({ title: '', description: '', department: '', date: '', startTime: '', endTime: '', status: '' });

  const { user, userEmail } = useContext(AuthContext)
  const { tests, departments } = useContext(ApiContext);
  const navigate = useNavigate();

  const handleEditTest = (test) => {
    setSelectedTest(test);
    setIsTestEditModalOpen(true);
  }

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await axios.get(`${serverURL}/api/admin/getDepartment/${userEmail}`);
        setExactDepartment(response.data.department);
      } catch (error) {
        console.error('Error fetching department:', error);
      }
    }
    fetchDepartment();
  }, [userEmail]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 text-gray-800 font-sans text-center">
        <div>
          <h1 className="text-4xl mb-4">Please <span className='underline cursor-pointer text-blue-400' onClick={() => {
            navigate('/');
          }}>Login</span>!</h1>
          <p className="text-xl">You need to be logged in to access the Dashboard.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-auto">
      <div className={`flex flex-col flex-grow`}>
        <Topbar changeView={(view) => setSelectedView(view)} />
        {selectedView === 'calendar' && (
          <div className="flex-grow pt-16 p-6 mt-2 bg-slate-500 text-white">
            <CalendarView actualUserDept={exactDepartment} department={exactDepartment} tests={[]} />
          </div>
        )}
        {selectedView === 'tests' && (
          <div className="flex-grow pt-16 p-6 mt-2 bg-slate-500 text-white">
            <TestsView
              tests={tests.filter(test => test.department === exactDepartment)}
              setIsTestModalOpen={setIsTestModalOpen}
              handleEditTest={handleEditTest}
            />
          </div>
        )}

      </div>

      <TestModal
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

      {selectedTest && (
        <EditTestModal
          test={selectedTest}
          isOpen={isTestEditModalOpen}
          onClose={() => setIsTestEditModalOpen(false)}
          onSave={(formData) => {
            console.log('Form Data:', formData);
            setIsTestEditModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default UserDashboard; 