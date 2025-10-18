import React, { useState, useEffect } from "react";
import Advertisment from "../../components/Advertisment/advertisment";
import Card from "../../components/Card/card";
import EditIcon from "@mui/icons-material/Edit";
import Post from "../../components/Post/post";
import AddIcon from "@mui/icons-material/Add";
import Modal from "../../components/Modal/modal";
import ImageModal from "../../components/ImageModal/imageModal";
import EditInfoModal from "../../components/EditInfoModal/editInfoModal";
import AboutModal from "../../components/AboutModal/aboutModal";
import ExpModal from "../../components/ExpModal/expModal";
import MessageModal from "../../components/MessageModal/messageModal";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Profile = () => {
  const { id } = useParams();

  const [imageSetModal, setImageSetModal] = useState(false);
  const [circularImage, setCircularImage] = useState(true);
  const [infoModal, setInfoModal] = useState(false);
  const [aboutModal, setAboutModal] = useState(false);
  const [expModal, setExpModal] = useState(false);
  const [messageModal, setMessageModal] = useState(false);

  const [userData, setUserData] = useState(null);
  const [postData, setPostData] = useState([]);
  const [ownData, setOwnData] = useState(null);

  const [updateExp, setUpdateExp] = useState({
    clicked: "",
    id: "",
    datas: {},
  });

  const updateExpEdit = (id, data) => {
    setUpdateExp({ ...updateExp, clicked: true, id: id, data: data });
    setExpModal((prev) => !prev);
  };

  useEffect(() => {
    fetchDataOnLoad();
  }, [id]);

  const fetchDataOnLoad = async () => {
    try {
      const [userDatas, postDatas, ownDatas] = await Promise.all([
        axios.get(`https://linkedin-clone-mernstack-1.onrender.com/api/auth/user/${id}`),
        axios.get(`https://linkedin-clone-mernstack-1.onrender.com/api/post/getTop5Post/${id}`),
        axios.get("https://linkedin-clone-mernstack-1.onrender.com/api/auth/self", {
          withCredentials: true,
        }),
      ]);
      setUserData(userDatas.data.user);
      setPostData(postDatas.data.posts);
      setOwnData(ownDatas.data.user);

      localStorage.setItem("userInfo", JSON.stringify(ownDatas.data.user));
    } catch (err) {
      console.log(err);
      alert("Something went wrong. Please try again later.");
    }
  };
  const handleMessageModal = () => {
    setMessageModal((prev) => !prev);
  };

  const handleExpModal = () => {
    if (expModal) {
      setUpdateExp({ clicked: "", id: "", datas: {} });
    }
    setExpModal((prev) => !prev);
  };

  const handleAboutModal = () => {
    setAboutModal((prev) => !prev);
  };

  const handleInfoModal = () => {
    setInfoModal((prev) => !prev);
  };

  const handleImageModalOpenClose = () => {
    setImageSetModal((prev) => !prev);
  };

  const handleOnEditCover = () => {
    setImageSetModal(true);
    setCircularImage(false);
  };

  const handleCircularImage = () => {
    setImageSetModal(true);
    setCircularImage(true);
  };

  const handleEditFunc = async (data) => {
    await axios
      .put(
        `https://linkedin-clone-mernstack-1.onrender.com/api/auth/update`,
        { user: data },
        { withCredentials: true }
      )
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong. Please try again later.");
      });
  };

  const amIFriend = () => {
    let arr = userData?.friends?.filter((item) => {
      return item === ownData._id;
    });
    return arr?.length;
  };

  const isInPendiingList = () => {
    let arr = userData?.pending_friends?.filter((item) => {
      return item === ownData._id;
    });
    return arr?.length;
  };

  const isInSelfPendingList = () => {
    let arr = ownData?.pending_friends?.filter((item) => {
      return item === userData._id;
    });
    return arr?.length;
  };

  const checkFriendStatus = () => {
    if (amIFriend()) {
      return "Disconnect";
    } else if (isInSelfPendingList()) {
      return "Approve Request";
    } else if (isInPendiingList()) {
      return "Request Sent";
    } else {
      return "Connect";
    }
  };

  const handleSendFriendRequest = async () => {
    if (checkFriendStatus() === "Request Sent") return;

    if (checkFriendStatus() === "Connect") {
      await axios
        .post(
          "https://linkedin-clone-mernstack-1.onrender.com/api/auth/sendFriendReq",
          { receiver: userData?._id },
          { withCredentials: true }
        )
        .then((res) => {
          toast.success(res.data.message);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err?.response?.data?.error);
        });
    } else if (checkFriendStatus() === "Approve Request") {
      await axios
        .post(
          "https://linkedin-clone-mernstack-1.onrender.com/api/auth/acceptFriendRequest",
          { friendId: userData?._id },
          { withCredentials: true }
        )
        .then((res) => {
          toast.success(res.data.message);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err?.response?.data?.error);
        });
    } else {
      await axios
        .delete(
          `https://linkedin-clone-mernstack-1.onrender.com/api/auth/removeFromFriendList/${userData?._id}`,
          { withCredentials: true }
        )
        .then((res) => {
          toast.success(res.data.message);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err?.response?.data?.error);
        });
    }
  };


  const handleLogout = async()=> {
    await axios.post('https://linkedin-clone-mernstack-1.onrender.com/api/auth/logout',{}, { withCredentials: true }).then(res =>{
      localStorage.clear();
      window.location.reload();

    }).catch((err) => {
          console.log(err);
          toast.error(err?.response?.data?.error);
        });
  }

    const copyToClipboard = async () => {
      try {
        let string = `https://liinkedinn.netlify.app/profile/${id}`;
        await navigator.clipboard.writeText(string);
        toast.success("Link copied to clipboard");
      } catch (err) {
        console.error("Failed to copy link to clipboard", err);
      }
    };

  return (
    <div className="px-5 xl:px-50 py-5 mt-5 flex flex-col pt-12 gap-5 w-full bg-orange-50">
      <div className="flex justify-between">
        {/* Left side main section */}
        <div className="w-full md:w-[70%]">
          <div>
            <Card padding={0}>
              <div className="w-full h-fit">
                <div className="relative w-full h-[200px]">
                  {userData?._id === ownData?._id && (
                    <div
                      className="absolute cursor-pointer top-3 right-3 z-20 w-[35px] flex justify-center items-center h-[35px] rounded-full p-3 bg-white"
                      onClick={handleOnEditCover}
                    >
                      <EditIcon />
                    </div>
                  )}
                  <img
                    className="w-full h-[200px] rounded-tr-lg rounded-tl-lg"
                    src={userData?.cover_pic}
                    alt="profile banner"
                  />

                  <div
                    onClick={handleCircularImage}
                    className="absolute object-cover top-24 left-6 z-10"
                  >
                    <img
                      className="rounded-full border-2 border-white cursor-pointer w-35 h-35"
                      src={userData?.profilePic}
                      alt="profile image"
                    />
                  </div>
                </div>

                <div className=" mt-10 relative px-8 py-2">
                  {userData?._id === ownData?._id && (
                    <div
                      className="absolute cursor-pointer top-0 right-3 z-20 w-[35px] h-[35px] flex justify-center items-center rounded-full p-3 bg-white"
                      onClick={handleInfoModal}
                    >
                      <EditIcon />
                    </div>
                  )}
                  <div className="w-full">
                    <div className="text-2xl font-semibold">
                      {userData?.f_name}
                    </div>
                    <div className="text-gray-700">{userData?.headline}</div>
                    <div className=" text-sm text-gray-500">
                      {userData?.curr_location}
                    </div>
                    <div className="text-md text-blue-800 w-fit cursor-pointer hover:underline">
                      {userData?.friends?.length} Connections
                    </div>

                    <div className="md:flex w-full justify-between">
                      <div className="my-5 flex gap-5">
                        <div className="cursor-pointer p-2 borer-1 rounded-lg bg-blue-800 text-white font-semibold">
                          Open to
                        </div>
                        <div onClick={copyToClipboard} className="cursor-pointer p-2 borer-1 rounded-lg bg-blue-800 text-white font-semibold">
                          Share
                        </div>
                        {userData?._id === ownData?._id && (
                          <div onClick={handleLogout} className="cursor-pointer p-2 borer-1 rounded-lg bg-blue-800 text-white font-semibold">
                            Logout
                          </div>
                        )}
                      </div>
                      <div className="my-5 flex gap-5">
                        {amIFriend() ? (
                          <div
                            className="cursor-pointer p-2 borer-1 rounded-lg bg-blue-800 text-white font-semibold"
                            onClick={handleMessageModal}
                          >
                            Message
                          </div>
                        ) : null}
                        {userData?._id === ownData?._id ? null : (
                          <div
                            onClick={handleSendFriendRequest}
                            className="cursor-pointer p-2 borer-1 rounded-lg bg-blue-800 text-white font-semibold"
                          >
                            {checkFriendStatus()}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-5">
            <Card padding={1}>
              <div className="flex justify-between items-center">
                <div className="text-xl">About</div>
                {userData?._id === ownData?._id && (
                  <div className="cursor-pointer" onClick={handleAboutModal}>
                    <EditIcon />
                  </div>
                )}
              </div>
              <div className="text-gray-700 text-md w-[85%]">
                {userData?.about}
              </div>
            </Card>
          </div>
          <div className="mt-5">
            <Card padding={1}>
              <div className="flex justify-between items-center">
                <div className="text-xl">Skills</div>
              </div>
              <div className="text-gray-700 tex-md my-2 w-full flex gap-4 flex-wrap">
                {userData?.skills?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="py-2 px-3 cursor-pointer bg-blue-800 text-white rounded-lg"
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          <div className="mt-5 ">
            <Card padding={1}>
              <div className="flex justify-between items-center">
                <div className="text-xl">Activities</div>
              </div>
              <div className="cursor-pointer px-3 py-1 w-fit border-1 rounded-4xl bg-green-800 text-white font-semibold">
                Post
              </div>

              {/* Parent div for scrollable cards */}
              <div className="overflow-x-auto my-2 flex gap-1 overflow-y-hidden w-full">
                {postData.map((item, ind) => {
                  return (
                    <Link
                      to={`/profile/${id}/activities/${item?._id}`}
                      className="cursor-pointer shrink-0 w-[350px] h-[560px]"
                    >
                      <Post profile={1} item={item} personalData={ownData} />
                    </Link>
                  );
                })}
              </div>

              <div className="w-full flex justify-center items-center">
                {postData.length > 5 && (
                  <Link
                    to={`/profile/${id}/activities`}
                    className="p-2 rounded-xl cursor-pointer hover:bg-gray-300"
                  >
                    Show All Posts
                    <ArrowRightAltIcon />
                  </Link>
                )}
              </div>
            </Card>
          </div>

          <div className="mt-5">
            <Card padding={1}>
              <div className="flex justify-between items-center">
                <div className="text-xl">Experinces</div>
                {userData?._id === ownData?._id && (
                  <div className="cursor-pointer" onClick={handleExpModal}>
                    <AddIcon />
                  </div>
                )}
              </div>

              <div className="mt-5">
                {userData?.experience.map((item, index) => {
                  return (
                    <div className="p-2 border-t-1 border-gray-300 flex justify-between">
                      <div>
                        <div className="text-lg">{item.designation}</div>
                        <div className="text-sm">{item.company_name}</div>
                        <div className="text-sm text-gray-500">
                          {item.duration}
                        </div>
                        <div className="text-sm text-gray-500">
                          {item.location}
                        </div>
                      </div>
                      {userData?._id === ownData?._id && (
                        <div
                          className="cursor-pointer "
                          onClick={() => {
                            updateExpEdit(item._id, item);
                          }}
                        >
                          <EditIcon />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>

        {/* Right side advertisment */}

        <div className="hidden md:flex md:w-[28%]">
          <div className="sticky top-19">
            <Advertisment />
          </div>
        </div>
      </div>

      {imageSetModal && (
        <Modal title="Upload Image" closeModal={handleImageModalOpenClose}>
          <ImageModal
            handleEditFunc={handleEditFunc}
            selfData={ownData}
            isCircular={circularImage}
          />
        </Modal>
      )}

      {infoModal && (
        <Modal title="Edit Info" closeModal={handleInfoModal}>
          <EditInfoModal handleEditFunc={handleEditFunc} selfData={ownData} />
        </Modal>
      )}

      {aboutModal && (
        <Modal title="About" closeModal={handleAboutModal}>
          <AboutModal handleEditFunc={handleEditFunc} selfData={ownData} />
        </Modal>
      )}

      {expModal && (
        <Modal title="Experience" closeModal={handleExpModal}>
          <ExpModal
            handleEditFunc={handleEditFunc}
            selfData={ownData}
            updateExp={updateExp}
            setUpdateExp={updateExpEdit}
          />
        </Modal>
      )}

      {messageModal && (
        <Modal title="Send Message" closeModal={handleMessageModal}>
          <MessageModal selfData={ownData} userData={userData} />
        </Modal>
      )}
      <ToastContainer />
    </div>
  );
};

export default Profile;
