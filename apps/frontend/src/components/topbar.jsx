/* eslint-disable react/prop-types */
import { FaBars } from "react-icons/fa";

const Topbar = ({ toggleSidebar }) => {
  return (
    <div className="h-16 bg-slate-600 text-white flex items-center justify-between px-4">
      <FaBars onClick={toggleSidebar} className="text-2xl cursor-pointer"/>
      <span className="text-xl font-bold">Test Scheduler</span>
      <div className="space-x-4">
        <button className="bg-blue-700 p-2 rounded-xl">Notifications</button>
        <button className="bg-blue-700 p-2 rounded-xl">Profile</button>
      </div>
    </div>
  );
};

export default Topbar;
