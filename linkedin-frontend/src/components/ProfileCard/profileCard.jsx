import React from "react";
import Card from "../Card/card";
import { Link } from "react-router-dom";

const ProfileCard = (props) => {
  return (
    <Card padding={0}>
      <Link to={`/profile/${props.data?._id}`} className="relative h-25">
        <div className="relative w-full h-22 rounded-md">
          <img
            className="rounded-t-md h-full w-full"
            src={props.data?.cover_pic}
          />
        </div>
        <div className="absolute top-14 left-6 z-10">
          <img
            className="rounded-full border-2 h-16 w-16 border-white cursor-pointer "
            src={props.data?.profilePic}
          />
        </div>
      </Link>
      <Link to={`/profile/${props.data?._id}`} className="p-5">
        <div className="text-xl font-semibold">{props?.data?.f_name}</div>
        <div className="text-sm my-1">{props?.data?.headline}</div>
        <div className="text-sm my-1">{props?.data?.curr_location}</div>
        <div className="text-sm my-1">
          {props?.data?.curr_company}
        </div>
      </Link>
    </Card>
  );
};

export default ProfileCard;
