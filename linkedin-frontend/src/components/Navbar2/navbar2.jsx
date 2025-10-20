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
      {/* Top Navbar: Only logo and search bar on mobile, full navbar on desktop */}
      <div className="bg-white h-14 flex items-center justify-between py-1 px-2 sm:px-5 xl:px-56 fixed top-0 w-full z-50 border-b border-gray-200">
        {/* Logo */}
        <Link to={"/feeds"} className="flex items-center mr-2">
          <img
            className="w-7 h-7 sm:w-8 sm:h-8"
            src="https://freelogopng.com/images/all_img/1656994981linkedin-icon-png.png"
            alt="logo"
          />
        </Link>
        {/* Search Bar */}
        <div className="flex-1 max-w-[120px] xs:max-w-[180px] sm:max-w-[300px] md:max-w-[400px] mx-1">
          <div className="relative">
            <input
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              className="w-full bg-gray-100 rounded-md h-8 sm:h-10 px-2 sm:px-4 placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search"
              onFocus={() => setDropdown(true)}
              onBlur={() => setTimeout(() => setDropdown(false), 200)}
            />
            {searchUser.length > 0 && debouncedTerm.length !== 0 && (
              <div className="absolute w-full left-0 bg-white mt-2 p-2 rounded-md shadow-lg border border-gray-200 z-50">
                {searchUser.map((item, index) => (
                  <Link
                    to={`/profile/${item?._id}`}
                    key={index}
                    className="flex gap-2 items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSearchTerm("")}
                  >
                    <img
                      className="w-8 h-8 rounded-full"
                      src={item?.profilePic}
                      alt="Profile"
                    />
                    <div className="font-medium text-gray-800 text-xs sm:text-sm">
                      {item?.f_name}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Desktop nav icons only, hidden on mobile */}
        <div className="hidden md:flex items-center gap-2 sm:gap-4">
          <Link to="/feeds" className="flex flex-col items-center px-1 sm:px-2">
            <HomeIcon className="text-lg sm:text-xl" />
            <span className="text-[10px] sm:text-xs">Home</span>
          </Link>
          <Link to="/myNetwork" className="flex flex-col items-center px-1 sm:px-2">
            <PeopleIcon className="text-lg sm:text-xl" />
            <span className="text-[10px] sm:text-xs">My Network</span>
          </Link>
          <Link to="/resume" className="flex flex-col items-center px-1 sm:px-2">
            <WorkIcon className="text-lg sm:text-xl" />
            <span className="text-[10px] sm:text-xs">Resume</span>
          </Link>
          <Link to="/messages" className="flex flex-col items-center px-1 sm:px-2">
            <ChatIcon className="text-lg sm:text-xl" />
            <span className="text-[10px] sm:text-xs">Messaging</span>
          </Link>
          <Link to="/notification" className="flex flex-col items-center px-1 sm:px-2 relative">
            <NotificationsIcon className="text-lg sm:text-xl" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 right-0 bg-red-600 text-white text-[9px] rounded-full px-1 min-w-[16px] text-center">{notificationCount}</span>
            )}
            <span className="text-[10px] sm:text-xs">Notifications</span>
          </Link>
          <Link to={`/profile/${userData?._id}`} className="flex flex-col items-center px-1 sm:px-2">
            <img className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-white" src={userData?.profilePic} alt="Profile" />
            <span className="text-[10px] sm:text-xs">Me</span>
          </Link>
        </div>
      </div>

      {/* Mobile Bottom Navbar (only on mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50 flex justify-between px-1 py-1 shadow-lg">
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
