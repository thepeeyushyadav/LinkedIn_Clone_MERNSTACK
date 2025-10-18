import React, { useState, useEffect } from "react";
import Advertisment from "../../components/Advertisment/advertisment";
import { motion } from "framer-motion";

const Resume = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    let userData = localStorage.getItem("userInfo");
    setUserData(userData ? JSON.parse(userData) : null);
  }, []);

  return (
    <div className="px-5 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-orange-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-[100%] py-5 sm:w-[74%]"
      >
        <img
          className="w-full h-full rounded-lg shadow-md"
          src={userData?.resume}
          alt="resume image"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="w-[26%] py-5 hidden md:block"
      >
        <div className="sticky top-19">
          <Advertisment />
        </div>
      </motion.div>
    </div>
  );
};

export default Resume;
