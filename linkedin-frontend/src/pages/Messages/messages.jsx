import React, { useState, useEffect, useRef } from "react";
import Card from "../../components/Card/card";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Conversation from "../../components/Conversation/conversation";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ImageIcon from "@mui/icons-material/Image";
import Advertisment from "../../components/Advertisment/advertisment";
import axios from "axios";
import socket from "../../../socket";
import { formatDistanceToNow } from "date-fns";

const Messages = () => {
  const [conversations, setConversations] = useState([]);

  const [ownData, setOwnData] = useState(null);

  const [activeConvId, setActiveConvId] = useState(null);
  const [selectedConvDetails, setSelectedConvDetails] = useState(null);

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  const [imgLink, setImgLink] = useState(null);

  const [messageText, setMessageText] = useState("");

  const ref = useRef();

  useEffect(() => {
    ref?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSelectedConv = (id, userData) => {
    setActiveConvId(id);
    socket.emit("joinConversation", { conversationId: id });
    setSelectedConvDetails(userData);
  };

  useEffect(() => {
    let userData = localStorage.getItem("userInfo");
    setOwnData(userData ? JSON.parse(userData) : null);
    fetchConversationOnLoad();
  }, []);

  useEffect(() => {
    if (activeConvId) {
      fetchMessages();
    }
  }, [activeConvId]);

  useEffect(() => {
    socket.on("receiveMessage", (response) => {
      setMessages([...messages, response]);
    });
  }, [messages]);

  const fetchMessages = async () => {
    await axios
      .get(`https://linkedin-clone-mernstack-1.onrender.com/api/message/${activeConvId}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setMessages(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong. Please try again later.");
      });
  };

  const fetchConversationOnLoad = async () => {
    await axios
      .get("https://linkedin-clone-mernstack-1.onrender.com/api/conversation/get-conversation", {
        withCredentials: true,
      })
      .then((res) => {
        setConversations(res.data.conversations);
        if (res.data?.conversations?.length === 0) {
          console.log("No conversations yet.");
          return; 
        }

        setActiveConvId(res.data?.conversations[0]?._id);
        // socket.emit("joinConversation", { conversationId: res.data?.conversations[0]?._id });
        let ownId = ownData?._id;
        let arr = res.data?.conversations[0]?.members?.filter(
          (it) => it._id !== ownId
        );
        setSelectedConvDetails(arr[0]);
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong. Please try again later.");
      });
  };

  const handleInputImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);

    data.append("upload_preset", "linkedInClone");
    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dk2gu2ld5/image/upload",
        data, { withCredentials: false }
      );

      const imageUrl = response.data.url;
      setImgLink(imageUrl);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    await axios
      .post(
        `https://linkedin-clone-mernstack-1.onrender.com/api/message`,
        { conversation: activeConvId, message: messageText, picture: imgLink },
        { withCredentials: true }
      )
      .then((res) => {
        setMessages([...messages, res.data]);

        socket.emit("sendMessage", activeConvId, res.data);
        setMessageText("");
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong. Please try again later.");
      });
  };

  return (
    <div className="px-5 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-orange-50">
      {/* main div */}
      <div className="w-full justify-between flex pt-5">
        {/* left side */}
        <div className=" w-full md:w-[70%]">
          <Card padding={0}>
            <div className="border-b-1 border-gray-300 px-5 py-2 font-semibold text-shadow-lg">
              Messaging
            </div>

            {/* div for chat */}
            <div className="w-full md:flex">
              <div className="h-[590px] overflow-auto w-full md:w-[40%] border-r-1 border-gray-400">
                {/* for each conversation */}

                {conversations.map((item, index) => {
                  return (
                    <Conversation
                      activeConvId={activeConvId}
                      handleSelectedConv={handleSelectedConv}
                      item={item}
                      key={index}
                      ownData={ownData}
                    />
                  );
                })}
              </div>

              <div className="w-full md:w-[60%] border-gray-400">
                <div className="border-gray-300 py-2 px-4 border-b-2 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-semibold">
                      {selectedConvDetails?.f_name}
                    </p>
                    <p className="text-sm text-gray-400">
                      {selectedConvDetails?.headline}
                    </p>
                  </div>
                  <div>
                    <MoreHorizIcon />
                  </div>
                </div>

                <div className="h-[360px] w-full overflow-auto border-b-1 border-gray-300">
                  <div className="border-b-1 border-gray-300 p-4 gap-3">
                    <img
                      className="w-17 h-15 rounded-full cursor-pointer"
                      src={selectedConvDetails?.profilePic}
                      alt="inside image of chat"
                    />
                    <div className="my-2">
                      <p className="text-sm font-semibold">
                        {selectedConvDetails?.f_name}
                      </p>
                      <p className="text-sm text-gray-400">
                        {selectedConvDetails?.headline}
                      </p>
                    </div>
                  </div>

                  <div className="w-full">
                    {/* for each message */}
                    {messages.map((item, index) => {
                      return (
                        <div
                          ref={ref}
                          key={index}
                          className="flex w-full cursor-pointer border-gray-300 gap-3 p-4"
                        >
                          <div className="shrink-0">
                            <img
                              className="w-9 h-7 rounded-full cursor-pointer"
                              src={item?.sender?.profilePic}
                              alt="inside image of chat"
                            />
                          </div>
                          <div className="mb-2 w-full">
                            <div className="flex justify-between items-center">
                              <div className="text-md">
                                {item?.sender?.f_name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {item.createdAt &&
                                  formatDistanceToNow(
                                    new Date(item.createdAt),
                                    {
                                      addSuffix: true,
                                    }
                                  )}
                              </div>
                            </div>

                            <div className="text-sm mt-6 hover:bg-gray-200">
                              {item?.message}
                            </div>
                            {item?.picture && (
                              <div className="my-2">
                                <img
                                  className="w-[240px] h-[180px] rounded-md"
                                  src={item?.picture}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* input message */}
                <div className="p-2 w-full border-b-1 border-gray-200">
                  <textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    rows={4}
                    className="bg-gray-200 outline-0 roudxl text-sm w-full p-3"
                    placeholder="Write a message"
                  ></textarea>
                </div>

                <div className="p-3 flex justify-between">
                  <div>
                    <label className="cursor-pointer" htmlFor="messageImage">
                      <ImageIcon />
                    </label>
                    <input
                      id="messageImage"
                      type="file"
                      onChange={handleInputImage}
                      className="hidden"
                    />
                  </div>
                  {!loading && (
                    <div
                      onClick={handleSendMessage}
                      className="px-3 py-1 cursor-pointer rounded-2xl border-1 bg-blue-950 text-white"
                    >
                      Send
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* right side */}
        <div className="hidden md:flex md:w-[25%]">
          <div className="sticky top-19">
            <Advertisment />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
