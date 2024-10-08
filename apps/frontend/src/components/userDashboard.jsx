import { useContext, useEffect, useState, useRef } from 'react';
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

  const { isUserAdmin } = useContext(AuthContext);
  const [selectedTest, setSelectedTest] = useState(null);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [isTestEditModalOpen, setIsTestEditModalOpen] = useState(false);

  const [successMessage, setSuccessMessage] = useState('');

  // const [newTest, setNewTest] = useState({ title: '', description: '', department: '', date: '', startTime: '', endTime: '', status: '' });

  const { user, userEmail } = useContext(AuthContext)
  const { tests } = useContext(ApiContext);
  const navigate = useNavigate();

  const addTestRef = useRef(null);
  const editTestRef = useRef(null);

  const handleClickOutside = (event) => {
    if (addTestRef.current && !addTestRef.current.contains(event.target)) {
      setIsTestModalOpen(false);
    }
    if (editTestRef.current && !editTestRef.current.contains(event.target)) {
      setIsTestEditModalOpen(false);
    }
  }

  useEffect(() => {
    if (isTestModalOpen || isTestEditModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isTestModalOpen, isTestEditModalOpen]);

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

        {successMessage && (
          <div className='fixed inset-x-0 bottom-0 mx-auto mb-20 w-1/4 border border-red-400 bg-red-200 py-2 rounded-lg'>
            <button onClick={() => setSuccessMessage('')} className="absolute top-0 right-0 text-red-500 font-bold px-2">&times;</button>
            <p className='text-red-500 text-center'>{successMessage}</p>
          </div>
        )}

      </div>

      <TestModal
        ref={addTestRef}
        isUserAdmin={isUserAdmin}
        userDept={exactDepartment}
        isOpen={isTestModalOpen}
        closeModal={() => setIsTestModalOpen(false)}
      />

      {selectedTest && (
        <EditTestModal
          ref={editTestRef}
          isUserAdmin={isUserAdmin}
          userDept={exactDepartment}
          test={selectedTest}
          isOpen={isTestEditModalOpen}
          onClose={() => setIsTestEditModalOpen(false)}
          onSave={(formData) => {
            console.log('Form Data:', formData);
            setIsTestEditModalOpen(false);
          }}
          setSuccessMessage={setSuccessMessage}
        />
      )}
    </div>
  );
};

export default UserDashboard; 