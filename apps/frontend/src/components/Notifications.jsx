import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { serverURL } from "../services/apiServices";

const Notifications = ({ userId }) => {
     const [notifications, setNotifications] = useState([]);
     const [dropdown, setDropdown] = useState(false);
     const dropdownRef = useRef(null);

     useEffect(() => {
          const fetchNotifications = async () => {
               try {
                    const response = await axios.get(`${serverURL}/api/notifications/getNotifications`);
                    setNotifications(response.data);
               } catch (error) {
                    console.error('Error fetching notifications:', error);
               }
          };
          fetchNotifications();
     }, [userId]);

     const toggleDropdown = () => {
          setDropdown(!dropdown);
     };

     const handleClickOutside = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
               setDropdown(false);
          }
     }

     useEffect(() => {
          if (dropdown) {
               document.addEventListener("mousedown", handleClickOutside);
          } else {
               document.removeEventListener("mousedown", handleClickOutside);
          }

          return () => {
               document.removeEventListener("mousedown", handleClickOutside);
          };
     }, [dropdown]);

     const markAsRead = async (notificationId, index) => {
          try {
               await axios.put(`${serverURL}/api/notifications/markAsRead/${notificationId}`);
               setNotifications((prevNotifications) => {
                    const updatedNotifications = [...prevNotifications];
                    updatedNotifications[index].isRead = true;
                    return updatedNotifications;
               });
          } catch (error) {
               console.error('Error marking notification as read:', error);
          }
     }

     return (
          <div className="relative" ref={dropdownRef}>
               <span
                    className="flex items-center text-md text-indigo-600 cursor-pointer p-2 rounded-md border border-indigo-300 bg-indigo-100 hover:bg-indigo-300 hover:text-indigo-700 transition-all duration-300"
                    onClick={toggleDropdown}
               >
                    🔔 Notifications
               </span>

               {dropdown && (
                    <div className="absolute right-0 mt-2 w-80 rounded-md shadow-md bg-gray-700">
                         {notifications.length === 0 ? (
                              <div className="w-full text-left px-4 py-2 text-white">No notifications</div>
                         ) : (
                              <div className=" text-left px-4 py-2 text-white">
                                   {notifications.slice(0, 10).map((notification, index) => (
                                        <div
                                             key={index}
                                             className={`py-2 px-2 rounded-md hover:bg-blue-800 cursor-pointer ${notification.isRead ? 'bg-gray-700' : 'bg-gray-600'}`}
                                             onClick={() => markAsRead(notification._id, index)}
                                             title={notification.isRead ? "Already marked as read" : "Click to mark as read"}
                                        >
                                             {notification.message}
                                        </div>
                                   ))}
                              </div>
                         )}
                    </div>
               )}
          </div>
     )
}

export default Notifications;