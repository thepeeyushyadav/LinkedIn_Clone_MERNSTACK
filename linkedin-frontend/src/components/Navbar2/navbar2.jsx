import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import WorkIcon from "@mui/icons-material/Work";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import axios from "axios";

const Navbar2 = () => {
  const location = useLocation();

  const [userData, setUserData] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [searchUser, setSearchUser] = useState([]);
  const [notificationCount, setNotificationCount] = useState("");
  const [dropdown, setDropdown] = useState(false);


  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedTerm) {
      searchAPICall();
    }
  }, [debouncedTerm]);

  const searchAPICall = async () => {
    await axios
      .get(`https://linkedin-clone-mernstack-1.onrender.com/api/auth/findUser?query=${debouncedTerm}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);

        setSearchUser(res.data.users);
      })
      .catch((err) => {
        console.log(err);
        alert(err?.response?.data?.error);
      });
  };

  const fetchNotification = async () => {
    await axios
      .get("https://linkedin-clone-mernstack-1.onrender.com/api/notification/activeNotification", {
        withCredentials: true,
      })
      .then((res) => {
        var count = res.data.count;
        setNotificationCount(count);
      })
      .catch((err) => {
        console.log(err);
        alert(err?.response?.data?.error);
      });
  };

  useEffect(() => {
    let userData = localStorage.getItem("userInfo");
    setUserData(userData ? JSON.parse(userData) : null);

    fetchNotification();
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Desktop Navbar */}
      <div className="bg-white h-14 flex justify-center py-1 px-5 xl:px-56 fixed top-0 w-full z-50 border-b border-gray-200 hidden sm:flex">
        <div className="flex items-center justify-between w-full max-w-screen-xl">
        {/* Left Section: Logo & Search */}
        <Link to={"/feeds"} className="flex items-center gap-2">
          <img
            className="w-8 h-8"
            src="https://freelogopng.com/images/all_img/1656994981linkedin-icon-png.png"
            alt="logo"
          />
        </Link>
        <div className="relative">
          <input
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            className="w-72 bg-gray-100 rounded-md h-10 px-4 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search"
            onFocus={() => setDropdown(true)}
            onBlur={() => setTimeout(() => setDropdown(false), 200)}
          />
          {searchUser.length > 0 && debouncedTerm.length !== 0 && (
            <div className="absolute w-80 left-0 bg-white mt-2 p-2 rounded-md shadow-lg border border-gray-200">
              {searchUser.map((item, index) => {
                return (
                  <Link
                    to={`/profile/${item?._id}`}
                    key={index}
                    className="flex gap-3 items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSearchTerm("")}
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src={item?.profilePic}
                      alt="Profile"
                    />
                    <div className="font-medium text-gray-800">
                      {item?.f_name}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Section (Nav Items as divs directly) */}
        <div className="flex items-end h-full gap-4">
          {/* Home */}
          <Link
            to={"/feeds"}
            className="group flex flex-col items-center justify-center h-full px-3 py-2 cursor-pointer rounded-lg transition-colors duration-200 hover:bg-gray-100"
          >
            <HomeIcon
              className={`text-xl ${
                isActive("/feeds")
                  ? "text-black"
                  : "text-gray-600 group-hover:text-black"
              }`}
            />
            <div
              className={`text-xs mt-1 font-medium border-b-2 ${
                isActive("/feeds")
                  ? "text-black border-gray-900"
                  : "text-gray-600 border-transparent group-hover:text-black group-hover:border-gray-900"
              }`}
            >
              Home
            </div>
          </Link>

          {/* My Network */}
          <Link
            to={"/myNetwork"}
            className="group flex flex-col items-center justify-center h-full px-3 py-2 cursor-pointer rounded-lg transition-colors duration-200 hover:bg-gray-100"
          >
            <PeopleIcon
              className={`text-xl ${
                isActive("/myNetwork")
                  ? "text-black"
                  : "text-gray-600 group-hover:text-black"
              }`}
            />
            <div
              className={`text-xs mt-1 font-medium border-b-2 ${
                isActive("/myNetwork")
                  ? "text-black border-gray-900"
                  : "text-gray-600 border-transparent group-hover:text-black group-hover:border-gray-900"
              }`}
            >
              My Network
            </div>
          </Link>

          {/* Resume */}
          <Link
            to={"/resume"}
            className="group flex flex-col items-center justify-center h-full px-3 py-2 cursor-pointer rounded-lg transition-colors duration-200 hover:bg-gray-100"
          >
            <WorkIcon
              className={`text-xl ${
                isActive("/resume")
                  ? "text-black"
                  : "text-gray-600 group-hover:text-black"
              }`}
            />
            <div
              className={`text-xs mt-1 font-medium border-b-2 ${
                isActive("/resume")
                  ? "text-black border-gray-900"
                  : "text-gray-600 border-transparent group-hover:text-black group-hover:border-gray-900"
              }`}
            >
              Resume
            </div>
          </Link>

          {/* Messaging */}
          <Link
            to={"/messages"}
            className="group flex flex-col items-center justify-center h-full px-3 py-2 cursor-pointer rounded-lg transition-colors duration-200 hover:bg-gray-100"
          >
            <ChatIcon
              className={`text-xl ${
                isActive("/messages")
                  ? "text-black"
                  : "text-gray-600 group-hover:text-black"
              }`}
            />
            <div
              className={`text-xs mt-1 font-medium border-b-2 ${
                isActive("/messages")
                  ? "text-black border-gray-900"
                  : "text-gray-600 border-transparent group-hover:text-black group-hover:border-gray-900"
              }`}
            >
              Messaging
            </div>
          </Link>

          {/* Notifications */}
          <Link
            to={"/notification"}
            className="group flex flex-col items-center justify-center h-full px-3 py-2 cursor-pointer rounded-lg transition-colors duration-200 hover:bg-gray-100"
          >
            <div>
              <NotificationsIcon
                className={`text-xl ${
                  isActive("/notifications")
                    ? "text-black"
                    : "text-gray-600 group-hover:text-black"
                }`}
              />{" "}
              {notificationCount > 0 && (
                <span className="p-1 rounded-full text-sm bg-red-700 text-white">
                  {notificationCount}
                </span>
              )}
            </div>

            <div
              className={`text-xs mt-1 font-medium border-b-2 ${
                isActive("/notifications")
                  ? "text-black border-gray-900"
                  : "text-gray-600 border-transparent group-hover:text-black group-hover:border-gray-900"
              }`}
            >
              Notifications
            </div>
          </Link>

          {/* Me */}
          <Link
            to={`/profile/${userData?._id}`}
            className="group flex flex-col items-center justify-center h-full px-3 py-2 cursor-pointer rounded-lg transition-colors duration-200 hover:bg-gray-100"
          >
            <img
              className="w-6 h-6 rounded-full border-2 border-white"
              src={userData?.profilePic}
              alt="Profile"
            />
            <div
              className={`text-xs mt-1 font-medium flex items-center border-b-2 ${
                isActive("/profile")
                  ? "text-black border-gray-900"
                  : "text-gray-600 border-transparent group-hover:text-black group-hover:border-gray-900"
              }`}
            >
              Me <ArrowDropDownIcon className="text-lg -ml-1" />
            </div>
          </Link>
        </div>
        </div>
      </div>

      {/* Mobile Bottom Navbar */}
      <nav className="sm:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50 flex justify-between px-1 py-1 shadow-lg">
        <Link to="/feeds" className={`flex flex-col items-center flex-1 py-1 transition-all ${isActive('/feeds') ? 'text-blue-600' : 'text-gray-500'} active:bg-gray-100`}> 
          <HomeIcon className="text-2xl" />
          <span className="text-xs">Home</span>
        </Link>
        <Link to="/myNetwork" className={`flex flex-col items-center flex-1 py-1 transition-all ${isActive('/myNetwork') ? 'text-blue-600' : 'text-gray-500'} active:bg-gray-100`}>
          <PeopleIcon className="text-2xl" />
          <span className="text-xs">Network</span>
        </Link>
        <Link to="/resume" className={`flex flex-col items-center flex-1 py-1 transition-all ${isActive('/resume') ? 'text-blue-600' : 'text-gray-500'} active:bg-gray-100`}>
          <WorkIcon className="text-2xl" />
          <span className="text-xs">Jobs</span>
        </Link>
        <Link to="/messages" className={`flex flex-col items-center flex-1 py-1 transition-all ${isActive('/messages') ? 'text-blue-600' : 'text-gray-500'} active:bg-gray-100`}>
          <ChatIcon className="text-2xl" />
          <span className="text-xs">Chat</span>
        </Link>
        <Link to="/notification" className={`flex flex-col items-center flex-1 py-1 relative transition-all ${isActive('/notification') ? 'text-blue-600' : 'text-gray-500'} active:bg-gray-100`}>
          <NotificationsIcon className="text-2xl" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 right-3 bg-red-600 text-white text-xs rounded-full px-1 min-w-[18px] text-center">{notificationCount}</span>
          )}
          <span className="text-xs">Notif</span>
        </Link>
        <Link to={`/profile/${userData?._id}`} className={`flex flex-col items-center flex-1 py-1 transition-all ${isActive(`/profile/${userData?._id}`) ? 'text-blue-600' : 'text-gray-500'} active:bg-gray-100`}>
          <img className="w-6 h-6 rounded-full border-2 border-white" src={userData?.profilePic} alt="Profile" />
          <span className="text-xs">Me</span>
        </Link>
      </nav>
    </>
  );
};

export default Navbar2;
