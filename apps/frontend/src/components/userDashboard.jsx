import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../components/topbar';
import CalendarView from '../components/calendarComponents/calendarView';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const UserDashboard = ({ }) => {
  const [exactDepartment, setExactDepartment] = useState('');

  const { user, userEmail } = useContext(AuthContext)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/admin/getDepartment/${userEmail}`);
        setExactDepartment(response.data.department);
      } catch (error) {
        console.error('Error fetching department:', error);
      }
    }
    fetchDepartment();
  }, [userEmail]);

  if(!user) {
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
        <Topbar />
        <div className="flex-grow pt-16 p-6 mt-2 bg-slate-500 text-white">
          <CalendarView actualUserDept={exactDepartment} department={exactDepartment} tests={[]} />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard; 