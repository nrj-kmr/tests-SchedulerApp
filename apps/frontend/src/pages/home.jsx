import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Login, Signup } from '../components';

export default function Home() {
   const [activeForm, setActiveForm] = useState('login');
   const [successMessage, setSuccessMessage] = useState('');
   const navigate = useNavigate();

   const showLogin = () => {
      setActiveForm('login');
      setSuccessMessage('');      
   }
   const showSignup = () => {
      setActiveForm('signup');
      setSuccessMessage('');
   }

   const handleSignupSuccess = () => {
      setActiveForm('login');
      setSuccessMessage('Signup successful. Please login to continue.');
   }

   useEffect(() => {
      if (successMessage) {
         setTimeout(() => {
            navigate('/Home');
         }, 2000);
      }
   }, [successMessage, navigate]);

   return (
      <div className="bg-slate-700 min-h-screen text-white flex flex-col items-center">
         <h1 className="text-center text-3xl font-bold mb-6 pt-20">theScheduler App</h1>

         {successMessage && (
            <div className="bg-green-500 p-2 rounded-md text-white w-80 text-center">
               {successMessage}
            </div>
         )}

         {activeForm === 'login' && (
            <div>
               <Login />
               <div className="flex items-center justify-center space-x-1 mt-6">
                  <p>Don't have an Account?</p>
                  <span onClick={showSignup} className='underline cursor-pointer'>Signup</span>
               </div>
            </div>
         )}

         {activeForm === 'signup' && (
            <div>
               <Signup onSucces={handleSignupSuccess} />
               <div className="flex items-center justify-center space-x-1 mt-6">
                  <p>Already have an Account?</p>
                  <span onClick={showLogin} className='underline cursor-pointer'>Login</span>
               </div>
            </div>
         )}
      </div>
   );
}