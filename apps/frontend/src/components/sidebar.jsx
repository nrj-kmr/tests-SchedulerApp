const Sidebar = () => {
  return (
    <div className="h-full w-64 bg-slate-700 text-white flex flex-col fixed top-16">
      <div className="p-4 text-2xl font-bold">
        Departments
      </div>
      <ul className="flex flex-col flex-grow">
        <li className="p-4 hover:bg-gray-700 cursor-pointer">Dept 01</li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">Dept 02</li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">Dept 03</li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">Dept 04</li>
      </ul>
    </div>
  );
};

export default Sidebar;