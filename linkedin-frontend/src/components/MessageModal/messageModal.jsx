import React, { useState } from "react";
import axios from "axios";
const MessageModal = ({ selfData, userData }) => {

  const [message, setMessage] = useState('');

  const handleSendMessage = async () => {
    await axios.post('http://localhost:4000/api/conversation/add-conversation',{receiverId:userData?._id, message}, {withCredentials: true}).then(res => {
      window.location.reload(); 

    }).catch((err) => {
        console.log(err);
        alert("Something went wrong. Please try again later.");
      });

  }

  return (
    <div className="mt-8 w-full h-[350px] overflow-auto">
      <div className="w-full mb-4">
        <br />
        <textarea value={message} onChange={(e) => setMessage(e.target.value)}
          className="p-2 mt-1 w-full border-1 rounded-md"
          cols={10}
          rows={8}
          placeholder="Send a message"
        ></textarea>
      </div>

      <div onClick={handleSendMessage} className="bg-blue-950 text-white w-fit py-1 px-3 cursor-pointer rounded-2xl">
        Send
      </div>
    </div>
  );
};

export default MessageModal;
