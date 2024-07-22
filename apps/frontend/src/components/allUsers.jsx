import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetAllUsers = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/getUsers')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching data!', error);
      });
  }, []);

  return (
    <div className='bg-black text-white min-h-screen'>
      {data ? (
        <table>
          <thead>
            <tr>
              <th className='border border-slate-600 p-2'>Sr. No.</th>
              <th className='border border-slate-600 p-2'>Full Name</th>
              <th className='border border-slate-600 p-2'>ID</th>
              <th className='border border-slate-600 p-2'>username</th>
              <th className='border border-slate-600 p-2'>email</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((user, index) => {
                return (
                  <>
                    <tr key={index}></tr>
                    <td className='border border-slate-700 p-2'>{index + 1}</td>
                    <td className='border border-slate-700 p-2'>{user.firstName} {user.lastName}</td>
                    <td className='border border-slate-700 p-2'>{user._id}</td>
                    <td className='border border-slate-700 p-2'>{user.userName}</td>
                    <td className='border border-slate-700 p-2'>{user.email}</td>
                  </>
                )
              })
            }
          </tbody>
        </table>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default GetAllUsers;
