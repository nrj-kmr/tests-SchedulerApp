import { useState } from 'react';
import LoginForm from '../components/loginForm';
import SignupForm from '../components/signupForm';

export default function Home() {
   const [activeForm, setActiveForm] = useState('login');

   const showLogin = () => setActiveForm('login');
   const showSignup = () => setActiveForm('signup');

   return (
      <div className="bg-slate-700 min-h-screen text-white flex flex-col items-center">
         <h1 className="text-center text-3xl font-bold mb-6 pt-20">theScheduler App</h1>

         <div className="flex items-center justify-center mb-6">
            <button
               className={`border border-gray rounded-2xl p-2 mr-1 transition-colors ${activeForm === 'login' ? 'bg-gray-800' : 'hover:bg-gray-800'}`}
               onClick={showLogin}
            >
               Login
            </button>

            <button
               className={`border border-gray rounded-2xl p-2 transition-colors ${activeForm === 'signup' ? 'bg-gray-800' : 'hover:bg-gray-800'}`}
               onClick={showSignup}
            >
               Signup
            </button>
         </div>

         {activeForm === 'login' && <LoginForm />}
         {activeForm === 'signup' && <SignupForm />}
      </div>
   );
}