import React, { useState, useEffect } from "react";
import ProfileCard from "../../components/ProfileCard/profileCard";
import Card from "../../components/Card/card";
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import ArticleIcon from "@mui/icons-material/Article";
import Advertisment from "../../components/Advertisment/advertisment";
import Post from "../../components/Post/post";
import Modal from "../../components/Modal/modal";
import AddModal from "../../components/AddModal/addModal";
import Loader from "../../components/Loader/loader";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Feeds = () => {
  const [personalData, setPersonalData] = useState(null);
  const [post, setPost] = useState([]);

  const [addPostModal, setAddPostModal] = useState(false);

  // const fetchSelfData = async () => {
  //   await axios.get('https://linkedin-clone-mernstack-1.onrender.com/api/auth/self', { withCredentials: true }).then(res => {
  //       setpersonalData(res.data.user);
  //   }).catch(err => {
  //     console.error('API error:', err);
  //     toast.error(err?.response?.data?.error);
  //   })

  // }

  const fetchData = async () => {
    try {
      const [userData, postData] = await Promise.all([
        await axios.get("https://linkedin-clone-mernstack-1.onrender.com/api/auth/self", {
          withCredentials: true,
        }),
        await axios.get("https://linkedin-clone-mernstack-1.onrender.com/api/post/getAllPost"),
      ]);
      setPersonalData(userData.data.user);
      localStorage.setItem("userInfo", JSON.stringify(userData.data.user));
      setPost(postData.data.posts);
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.error);
    }
  };

  useEffect(() => {
    // fetchSelfData()

    fetchData();
  });

  const handleAddPostModal = () => {
    setAddPostModal((prev) => !prev);
  };

  return (
  <div className="px-1 sm:px-5 xl:px-50 py-2 sm:py-9 flex flex-col md:flex-row gap-1 sm:gap-5 w-full mt-1 sm:mt-5 bg-orange-50 min-h-screen overflow-x-hidden">
      {/* left side */}
      <div className="hidden md:block w-full md:w-[21%] lg:w-[23%] py-3">
        <div className="h-fit">
          <ProfileCard data={personalData} />
        </div>
        <div className="w-full my-5">
          <Card padding={1}>
            <div className="text-xl font-semibold">Top Skills</div>
            <div className="flex flex-wrap gap-2 mt-2">
              {personalData?.skills?.slice(0, 5).map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full cursor-pointer"
                  title="User skill"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Advertisement Section */}
            <div className="mt-4 border-t pt-3 text-gray-700">
              <div className="text-sm mb-2 font-semibold">Sponsored</div>
              <div className="text-sm mb-1">
                <strong>Enhance Your Skills Today!</strong>
                <div className="text-xs text-gray-500">
                  Discover new opportunities and grow professionally
                </div>
              </div>
              <div className="text-sm mb-1">
                <strong>Exclusive Learning Resources</strong>
                <div className="text-xs text-gray-500">
                  Access guides, templates, and tutorials for free
                </div>
              </div>
              <div className="text-sm mb-1">
                <strong>Stay Ahead in Your Career</strong>
                <div className="text-xs text-gray-500">
                  Tips and tricks to improve efficiency and productivity
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

  {/* middle side */}
  <div className="w-full py-1 md:py-5 md:w-[50%]">
        <div>
          {/* Post Section */}
          <Card padding={1}>
            <div className="flex gap-2 items-center">
              <img
                className="rounded-full w-8 h-8 sm:w-13 sm:h-13 border-2 border-white cursor-pointer"
                src={personalData?.profilePic}
              />
              <div
                onClick={() => setAddPostModal(true)}
                className="w-full border-1 py-1 sm:py-3 px-1 sm:px-3 rounded-3xl cursor-pointer hover:bg-gray-100 text-xs sm:text-base text-gray-700"
              >
                Start a post
              </div>
            </div>

            <div className="w-full flex flex-col xs:flex-row mt-1 gap-1 xs:gap-0">
              <div
                onClick={() => setAddPostModal(true)}
                className="flex gap-1 sm:gap-2 p-1 cursor-pointer justify-center rounded-lg w-full xs:w-[33%] hover:bg-gray-100 text-xs sm:text-base"
              >
                <DynamicFeedIcon sx={{ color: 'green', fontSize: 16 }} /> Post
              </div>
              <div
                onClick={() => setAddPostModal(true)}
                className="flex gap-1 sm:gap-2 p-1 cursor-pointer justify-center rounded-lg w-full xs:w-[33%] hover:bg-gray-100 text-xs sm:text-base"
              >
                <InsertPhotoIcon sx={{ color: 'blue', fontSize: 16 }} /> Photo
              </div>
              <div
                onClick={() => setAddPostModal(true)}
                className="flex gap-1 sm:gap-2 p-1 cursor-pointer justify-center rounded-lg w-full xs:w-[33%] hover:bg-gray-100 text-xs sm:text-base"
              >
                <ArticleIcon sx={{ color: 'orange', fontSize: 16 }} /> Article
              </div>
            </div>
          </Card>
        </div>

        <div className="border-b-1 border-gray-400 w-[100%] my-5" />

  <div className="w-full flex flex-col gap-2 sm:gap-5">
          {post.map((item, index) => {
            return <Post item={item} key={index} personalData={personalData} />;
          })}
        </div>
      </div>

  {/* right side */}
  <div className="hidden md:block w-full md:w-[26%] py-3 md:py-5">
        <div>
          <Card padding={1}>
            <div className="text-xl font-semibold">Sponsored</div>
            <div className="text-gray-600 text-sm mt-1">
              Upgrade your skills today!
            </div>

            <div className="my-2">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80"
                alt="Ad Banner"
                className="w-full rounded-lg"
              />
            </div>

            <div className="my-2 text-sm text-gray-700">
              Explore new courses, tutorials, and resources to boost your
              career. Learn at your own pace and stay ahead!
            </div>

            <button className="bg-blue-600 text-white px-3 py-1 rounded-md mt-2 hover:bg-blue-700">
              Discover More
            </button>
          </Card>
        </div>

        <div className="my-5 sticky top-19">
          <Advertisment />
        </div>
      </div>
      {addPostModal && (
        <Modal closeModal={handleAddPostModal} title={""}>
          <AddModal personalData={personalData} />
        </Modal>
      )}
      <ToastContainer />
    </div>
  );
};

export default Feeds;
