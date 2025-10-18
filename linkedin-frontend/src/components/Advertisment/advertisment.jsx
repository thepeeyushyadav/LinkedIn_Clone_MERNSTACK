import React, {useState, useEffect} from "react";
import Card from "../Card/card";

const Advertisment = () => {

  const [userData, setUserData] = useState(null)


  useEffect(()=>{
    let userData = localStorage.getItem('userInfo')
    setUserData(userData? JSON.parse(userData) : null)
  }, [])

  return (
    <div className="sticky top-18">
      <Card padding={0}>
        <div className="relative h-25">
          <div className="relative w-full h-22 rounded-md">
            <img
              className="rounded-t-md h-full w-full"
              src={'https://unbounce.com/photos/beginners-guide-to-linkedin-advertising-feature-image.jpg'}
              alt="Expolore Now Banner"
            />
          </div>
          <div className="absolute top-14 left-[40%] z-10 ">
            <img
              className="rounded-full border-2 h-14 w-14 border-white cursor-pointer "
              src={userData?.profilePic}
              alt="Explore now LOGO"
            />
          </div>
        </div>

        <div className="px-5 my-5 mx-auto">
          <div className="text-sm font-semibold text-center">{userData?.f_name}</div>
          <div className="text-sm my-3 text-center">
            Get started on your professional journey with LinkedIn
          </div>
          <div className="text-sm my-1 text-center p-2 rounded-2xl font-bold border-blue-950  text-white bg-blue-800 cursor-pointer">
            Explore Now
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Advertisment;
