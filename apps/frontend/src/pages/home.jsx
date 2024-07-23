import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/loginForm';
import SignupForm from '../components/signupForm';
import Login from '../components/login';
import Signup from '../components/signup';

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();

  const toggleLogin = () => {
    setShowLogin(!showLogin);
    setShowSignup(false); // Hide signup form if login is shown
  };

  const toggleSignup = () => {
    setShowSignup(!showSignup);
    setShowLogin(false); // Hide login form if signup is shown
  };

  return (
    <div className="bg-slate-700 min-h-screen text-white flex flex-col items-center">
      <h1 className="text-center text-3xl font-bold mb-6 pt-20">theScheduler App</h1>

      <div className="flex items-center justify-center mb-6">
        <button
          className="border border-gray rounded-2xl p-2 mr-1 hover:bg-gray-800 transition-colors"
          onClick={toggleLogin}
        >
          {showLogin ? "Hide Login" : "Login"}
        </button>

        <button
          className="border border-gray rounded-2xl p-2 hover:bg-gray-800 transition-colors"
          onClick={toggleSignup}
        >
          {showSignup ? "Hide Signup" : "Signup"}
        </button>
      </div>

      {/* {showLogin && <LoginForm />}
      {showSignup && <SignupForm />} */}

      {showLogin && <Login />}
      {showSignup && <Signup />}

    </div>
  );
}
