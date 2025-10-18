import React, { useState, useEffect } from "react";

const Conversation = ({
  item,
  key,
  ownData,
  handleSelectedConv,
  activeConvId,
}) => {
  const [memberData, setMemberData] = useState(null);

  useEffect(() => {
    let ownId = ownData?._id;
    let arr = item?.members?.filter((it) => it._id !== ownId);
    setMemberData(arr[0]);
  }, []);

  const handleClickFunc = async () => {
    handleSelectedConv(item?._id, memberData);
  };

  return (
    <div
      onClick={handleClickFunc}
      key={key}
      className={`flex items-center w-full cursor-pointer border-b-1 border-gray-300  gap-3 p-4 hover:bg-gray-300 ${
        activeConvId === item?._id ? "bg-gray-200" : null
      }`}
    >
      <div className="shrink-0">
        <img
          className="w-14 h-12 cursor-pointer rounded-[100%]"
          src={memberData?.profilePic}
          alt="random person image"
        />
      </div>
      <div>
        <div className="text-md">{memberData?.f_name}</div>
        <div className="text-sm  text-gray-500">{memberData?.headline}</div>
      </div>
    </div>
  );
};

export default Conversation;
