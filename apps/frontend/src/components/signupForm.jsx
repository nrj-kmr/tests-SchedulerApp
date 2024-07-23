// src/components/SignupForm.jsx
import React from 'react';

const SignupForm = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input type="email" className="w-full p-2 mt-1 bg-gray-900 border border-gray-700 rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Password</label>
          <input type="password" className="w-full p-2 mt-1 bg-gray-900 border border-gray-700 rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Confirm Password</label>
          <input type="password" className="w-full p-2 mt-1 bg-gray-900 border border-gray-700 rounded" />
        </div>
        <button type="submit" className="w-full p-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors">Signup</button>
      </form>
    </div>
  );
};

export default SignupForm;
