import React, { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const ImageModal = ({ isCircular, selfData, handleEditFunc }) => {
  const [imgLink, setImgLink] = useState(
    isCircular ? selfData?.profilePic : selfData?.cover_pic
  );

  const [loading, setLoading] = useState(false);

  const handleInputImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);

    data.append("upload_preset", "linkedInClone");
    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dk2gu2ld5/image/upload",
        data
      );

      const imageUrl = response.data.url;
      setImgLink(imageUrl);
    } catch (err) {
      console.err(err);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmitBtn = async()=>{
    let { data } = { ...selfData };
    if(isCircular){
      data = { ...data, ['profilePic']: imgLink }
    } else {
      data = {...data, ['cover_pic']: imgLink }
    }
    handleEditFunc(data);

  }
  return (
    <div className="p-5 relative flex items-center flex-col h-full">
      {isCircular ? (
        <img className="rounded-full w-[150px] h-[150px]" src={imgLink} />
      ) : (
        <img className="w-full h-[150px] object-cover" src={imgLink} />
      )}

      <label
        htmlFor="btn-submit"
        className="absolute bottom-10 left-0 p-3 bg-blue-900 text-white rounded-2xl cursor-pointer"
      >
        Upload
      </label>
      <input
        onChange={handleInputImage}
        type="file"
        className="hidden"
        id="btn-submit"
      />

      {loading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <div className="absolute bottom-10 right-0 p-3 bg-blue-900 text-white rounded-2xl cursor-pointer" onClick={handleSubmitBtn}>
          Submit
        </div>
      )}
    </div>
  );
};

export default ImageModal;
