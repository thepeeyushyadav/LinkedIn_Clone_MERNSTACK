import React, { useState, useEffect } from "react";
import Advertisment from "../../components/Advertisment/advertisment";
import ProfileCard from "../../components/ProfileCard/profileCard";
import Card from "../../components/Card/card";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Notification = () => {
  const navigate = useNavigate();
  const [ownData, setOwnData] = useState(null);

  const [notifications, setNotifications] = useState([]);

  const fetchNotificationData = async () => {
    try {
      const res = await axios.get("https://linkedin-clone-mernstack-1.onrender.com/api/notification", {
        withCredentials: true,
      });
      console.log("Notification response:", res.data);
      setNotifications(res.data.notification);
    } catch (err) {
      console.log(err);
      alert("Something went wrong. Please try again later.");
    }
  };

  useEffect(() => {
    let userData = localStorage.getItem("userInfo");
    setOwnData(userData ? JSON.parse(userData) : null);

    fetchNotificationData();
  }, []);

  const handleOnClickNotification = async (item) => {
    await axios
      .put(
        "https://linkedin-clone-mernstack-1.onrender.com/api/notification/isRead",
        { notificationId: item._id },
        { withCredentials: true }
      )
      .then((res) => {
        if (item.type === "comment") {
          navigate(`/profile/${ownData?._id}/activities/${item?.postId}`);
        } else {
          navigate("/myNetwork");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong. Please try again later.");
      });
  };

  return (
    <div className="px-5 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-orange-50">
      {/* left side */}
      <div className="w-[21%] sm:block sm:w-[23%] hidden py-3">
        <div className="h-fit">
          <ProfileCard data={ownData} />
        </div>
      </div>

      {/* middle side */}
      <div className="w-full py-5 sm:w-[50%]">
        <div>
          <Card padding={0}>
            <div className="w-full">
              {notifications.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      handleOnClickNotification(item);
                    }}
                    className={`border-b-1 cursor-pointer flex gap-4 items-center border-gray-300 p-3 ${
                      item?.isRead ? "bg-gray-200" : "bg-blue-100"
                    }`}
                  >
                    <img
                      className="rounded-full cursor-pointer w-15 h-15"
                      src={item?.sender?.profilePic}
                    />
                    <div>{item?.content}</div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>

      {/* right side */}
      <div className="w-[26%] py-5 hidden md:block">
        <div className="my-5 sticky top-19">
          <Advertisment />
        </div>
      </div>
    </div>
  );
};

export default Notification;
