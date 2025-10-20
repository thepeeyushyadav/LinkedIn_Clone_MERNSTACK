import React, { useState, useEffect } from "react";
import ProfileCard from "../../components/ProfileCard/profileCard";
import axios from "axios";

const MyNetwork = () => {
  const [text, setText] = useState("Catch up with friends");
  const [data, setData] = useState([]);

  const handleFriends = async () => {
    setText("Catch up with friends");
  };

  const handlePending = async () => {
    setText("Pending Request");
  };

  const fetchFriendList = async () => {
    await axios
      .get("https://linkedin-clone-mernstack-1.onrender.com/api/auth/friendsList", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setData(res.data.friends);
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong. Please try again later.");
      });
  };
  const fetchPendingRequest = async () => {
    await axios
      .get("https://linkedin-clone-mernstack-1.onrender.com/api/auth/pendingFriendsList", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setData(res.data.pendingFriends);
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong. Please try again later.");
      });
  };

  useEffect(() => {
    if (text === "Catch up with friends") {
      fetchFriendList();
    } else {
      fetchPendingRequest();
    }
  }, [text]);

  return (
    <div className="px-2 sm:px-5 xl:px-50 py-2 sm:py-9 flex flex-col gap-3 w-full mt-2 sm:mt-5 bg-orange-50 min-h-screen">
      {/* Responsive Catch up section */}
      <div className="py-2 px-2 sm:px-10 border-1 border-gray-400 w-full flex flex-col sm:flex-row sm:justify-between items-center my-2 sm:my-5 text-base sm:text-xl bg-white rounded-xl">
        <div className="mb-2 sm:mb-0 text-center sm:text-left">{text}</div>
        <div className="flex gap-2 sm:gap-3">
          <button
            onClick={handleFriends}
            className={`px-2 py-1 border-1 rounded-md cursor-pointer border-gray-300 text-xs sm:text-base ${
              text === "Catch up with friends" ? "bg-blue-800 text-white" : ""
            }`}
          >
            Friends
          </button>
          <button
            onClick={handlePending}
            className={`px-2 py-1 border-1 rounded-md border-gray-300 cursor-pointer text-xs sm:text-base ${
              text === "Pending Request" ? "bg-blue-800 text-white" : ""
            }`}
          >
            Pending Request
          </button>
        </div>
      </div>

      {/* Responsive cards */}
      <div className="flex w-full gap-3 sm:gap-7 flex-wrap items-start justify-center">
        {data.map((item, index) => {
          return (
            <div className="w-[90vw] sm:w-[48%] md:w-[23%] h-[160px] sm:h-[220px] bg-white rounded-xl shadow border p-2 flex flex-col justify-center items-center">
              <ProfileCard data={item} />
            </div>
          );
        })}

        {
          data.length ===0 ? text==="Catch up with friends"? <div>No Any Friends Yet</div>: <div>No Any Pending Request Yet</div> : null  
        }
      </div>
    </div>
  );
};

export default MyNetwork;
