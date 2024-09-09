import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { serverURL } from "../services/apiServices";

const Notifications = ({ userId }) => {
     const [notifications, setNotifications] = useState([]);
     const [unreadCount, setUnreadCount] = useState(0);
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

     useEffect(() => {
          setUnreadCount(notifications.filter((notification) => !notification.isRead).length);
     }, [notifications]);

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
               setUnreadCount((prevCount) => prevCount - 1);
          } catch (error) {
               console.error('Error marking notification as read:', error);
          }
     }

     const deleteNotification = async (notificationId) => {
          try {
               const response = await axios.delete(`${serverURL}/api/notifications/deleteNotification/${notificationId}`);
               if (response.status === 200) {
                    setNotifications((prevNotifications) => prevNotifications.filter((notification) => notification._id !== notificationId));
                    setUnreadCount((prevCount) => prevCount - 1);
               }
          } catch (error) {
               console.error('Error deleting notification:', error);
          }
     }

     return (
          <div className="relative" ref={dropdownRef}>
               <span
                    className="flex items-center text-md text-indigo-600 cursor-pointer p-2 rounded-md border border-indigo-300 bg-indigo-100 hover:bg-indigo-300 hover:text-indigo-700 transition-all duration-300"
                    onClick={toggleDropdown}
               >
                    🔔 Notifications
                    {unreadCount > 0 && (
                         <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                              {unreadCount}
                         </span>
                    )}
               </span>

               {dropdown && (
                    <div className="absolute right-0 mt-2 w-max max-w-96 rounded-md shadow-md bg-gray-700">
                         {notifications.length === 0 ? (
                              <div className="w-full text-left px-4 py-2 text-white">No notifications</div>
                         ) : (
                              <div className="w-full text-left px-2 py-2 text-white" style={{ maxHeight: "500px", overflowY: "auto" }}>
                                   {notifications.map((notification, index) => (
                                        <div
                                             key={index}
                                             className={`relative py-2 px-2 rounded-md hover:bg-blue-800 cursor-pointer ${notification.isRead ? 'bg-gray-700' : 'bg-gray-600'} group`}
                                             onClick={() => markAsRead(notification._id, index)}
                                             title={notification.isRead ? "Already marked as read" : "Click to mark as read"}
                                        >
                                             <div className="flex flex-col">
                                                  <div>
                                                       <span className="text-sm text-green-400 font-bold">{notification.title}</span>
                                                       <span className="text-xs text-gray-400 ml-2">{new Date(notification.createdAt).toLocaleString()}</span>
                                                  </div>
                                                  <div className="flex">
                                                       {!notification.isRead && <span className="text-xs text-gray-400 m-2">New</span>}
                                                       {notification.message}
                                                  </div>
                                             </div>
                                             <span
                                                  title="Delete this notification"
                                                  className="absolute right-4 top-1/2 transform -translate-y-1/2  rounded-full px-2 text-base font-bold border border-red-400 bg-red-300 text-red-600  hover:text-red-800 hover:bg-red-400 cursor-pointer hidden group-hover:block transition-all duration-300"
                                                  onClick={(e) => {
                                                       e.stopPropagation(); // Prevent the markAsRead handler from being called
                                                       deleteNotification(notification._id);
                                                  }}
                                             >
                                                  &times;
                                             </span>
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