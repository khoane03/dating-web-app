import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft, faArrowRight, faFaceGrin, faHeart,
  faLocationDot, faQuoteLeft, faQuoteRight,
} from "@fortawesome/free-solid-svg-icons";
import { IoThumbsUp, IoHeart, IoHappy, IoSad } from "react-icons/io5";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { getAllPosts, getPostByUserId } from "../../service/postService";
import { getUserLogin } from "../../service/userService";
import { calculationDistance } from "../../service/location";
import Reactions from "../reaction/Reactions";
import { checkReaction, countReactions } from "../../service/reactionService";
import { addMatch, checkMatch } from "../../service/matchServie";
import Match from "./Match";

const icons = (type) => {
  switch (type) {
    case "like":
      return <IoThumbsUp size={29} className="text-blue-500 ml-1" />;
    case "love":
      return <IoHeart size={29} className="text-pink-500 ml-1" />;
    case "happy":
      return <IoHappy size={29} className="text-orange-500 ml-1" />;
    case "sad":
      return <IoSad size={29} className="text-red-500 ml-1" />;
    default:
      return <IoThumbsUp size={29} className="text-gray-500 ml-1" />;
  }
};

const TinderSwipe = ({ posts_id }) => {
  const [profile, setProfile] = useState([]);
  const [currentProfile, setCurrentProfile] = useState(0);
  const [currentPost, setCurrentPost] = useState(0);
  const [userLocation, setUserLocation] = useState({ avatar_url: '', latitude: 0, longitude: 0 });
  const [distance, setDistance] = useState(new Map());
  const [loading, setLoading] = useState(false);
  const [totalReaction, setTotalReaction] = useState(0);
  const [reactionType, setReactionType] = useState('');
  const [matched, setMatched] = useState(new Map());
  const [showMatch, setShowMatch] = useState(false);

  const handleMatch = async (user_id) => {
    try {
      await addMatch(user_id);
      setShowMatch(false);
    } catch (error) {
      console.error(error);
    }
  };

  const updateTotalReaction = async (postId) => {
    try {
      const res = await countReactions(postId);
      setTotalReaction(res.data.count);
      const checkRes = await checkReaction(postId);
      setReactionType(checkRes.data?.reaction_type || '');
    } catch (error) {
      console.error("Lỗi cập nhật reaction:", error);
    }
  };

  //danh sách match
  useEffect(() => {
    const getListMatch = async () => {
      const listMatchs = new Map();
      const matchPromises = profile.map(async (user) => {
        const res = await checkMatch(user.user_id);
        listMatchs.set(user.user_id, res ? res.status : 0);
      });
      await Promise.all(matchPromises);
      setMatched(listMatchs);
    };

    if (profile.length > 0) getListMatch();
  }, [profile, userLocation, showMatch]);


  //lấy danh sách bài post
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const user = await getUserLogin();
        setUserLocation({ latitude: user.data.latitude, longitude: user.data.longitude, avatar_url: user.data.avatar_url });
        if (location.pathname === "/search" && !posts_id) {
          setProfile([]);
          return;
        }
        const res = posts_id ? await getPostByUserId(posts_id) : await getAllPosts();
        setProfile(res.data);
      } catch (error) {
        console.error("Lỗi lấy danh sách bài post:", error);
      } finally {
        setTimeout(() => setLoading(false), 3000);
      }
    };
    fetchPosts();
  }, [posts_id]);

  //lấy khoảng cách giữa người dùng và người khác
  useEffect(() => {
    const calculateDistances = async () => {
      const distanceMap = new Map();
      const distancePromises = profile.map(async (user) => {
        const res = await calculationDistance(
          user.latitude, user.longitude, userLocation.latitude, userLocation.longitude
        );
        distanceMap.set(user.user_id, res);
      });
      await Promise.all(distancePromises);
      setDistance(distanceMap);
    };

    if (profile.length > 0) calculateDistances();
  }, [profile, userLocation]);


  if (profile.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-white text-center text-2xl">Không có dữ liệu</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="relative w-28 h-28 flex justify-center items-center">
          <div className="absolute inset-0 flex justify-center items-center border-2 bg-pink-400 border-pink-600 rounded-full animate-ping w-28 h-28">
          </div>
          <img className="rounded-full w-24 h-24 border-2 border-gray-300" src={userLocation.avatar_url} alt="" />
        </div>
      </div>
    );
  }

  const handleNavigation = (action, lists, setState, resetState = null) => {
    setState((prev) => {
      const newIndex =
        action === "prev" ? (prev - 1 + lists.length) % lists.length
          : (prev + 1) % lists.length;
      if (resetState) resetState(0);
      return newIndex;
    });
  };


  const NavImage = () => {
    return (
      <div className="mt-2 flex justify-center w-full absolute top-2">
        <div className="flex space-x-1">
          {profile[currentProfile]?.posts?.map((_, index) => (
            <div key={index}
              className={`w-3 h-3 rounded-full bg-gray-700 ${currentPost === index ? "bg-white" : "hover:bg-white"}`}
            ></div>
          ))}
        </div>
      </div>
    );
  };

  const ButtonImage = () => {
    return (
      <>
        {profile[currentProfile]?.posts?.length > 1 && (
          <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4">
            <button onClick={() => handleNavigation("prev", profile[currentProfile].posts, setCurrentPost)}>
              <FaArrowLeft className="border-2 text-4xl p-2 bg-gray-700 rounded-full hover:bg-white hover:text-black text-white" />
            </button>
            <button onClick={() => handleNavigation("next", profile[currentProfile].posts, setCurrentPost)}>
              <FaArrowRight className="border-2 text-4xl p-2 bg-gray-700 rounded-full hover:bg-white hover:text-black text-white" />
            </button>
          </div>
        )}
      </>
    );
  }

  const matchStatus = matched.get(profile[currentProfile]?.user_id);
  const colorClass = matchStatus === 2 ? "text-pink-500"
    : matchStatus === 1 ? "text-yellow-500"
      : "text-green-500";

  const currentPostData = profile[currentProfile]?.posts?.[currentPost] || {};

  return (
    <>
      <div className={`flex justify-center items-center h-screen`}>
        <div className="relative w-[400px] h-[90%] border-2 border-gray-800 rounded-2xl overflow-hidden">
          {showMatch && <Match className='transition-transform duration-1000 ease-in-out'
            user1Image={userLocation.avatar_url}
            user2Image={profile[currentProfile]?.avatar_url || 'default.jpg'}
            matchedUserName={profile[currentProfile]?.full_name}
            status={matched.get(profile[currentProfile]?.user_id)}
            isAccept={() => { handleMatch(profile[currentProfile]?.user_id) }}
            isReject={() => { setShowMatch(false) }}
          />}
          <div className={`${showMatch ? 'hidden' : 'block'} relative group w-full h-full bg-black text-white rounded-2xl overflow-hidden shadow-2xl`}>
            {/* Hiển thị ảnh bài post */}
            <img
              src={currentPostData.images}
              alt="Hồ sơ"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Thanh điều hướng ảnh */}
            <NavImage />

            {/* Nút điều hướng ảnh */}
            <ButtonImage />

            {/* Thông tin hồ sơ */}
            <div className="absolute bottom-0 left-0 right-0 rounded-2xl backdrop-blur-sm z-[1000]">
              <div className="p-4">
                {/* Hiển thị khoảng cách */}
                <div className="flex items-center bg-green-300 p-2 rounded-lg w-1/3">
                  <FontAwesomeIcon icon={faLocationDot} className="text-yellow-700" />
                  <span className="ml-2 text-black">{distance.get(profile[currentProfile]?.user_id) || "N/A"}</span>
                </div>

                {/* Tên và link profile */}
                <Link to={`/profile/${profile[currentProfile]?.user_id}`}>
                  <h1 className="text-4xl font-bold m-2 hover:text-pink-400">
                    {profile[currentProfile]?.full_name}
                  </h1>
                </Link>

                {/* Nội dung bài post */}
                <span className="ml-2 text-white bg-gray-700 p-2 rounded-lg inline-flex items-center">
                  <FontAwesomeIcon icon={faQuoteLeft} className="mr-2" />
                  <span className="font-semibold">{currentPostData.contents}</span>
                  <FontAwesomeIcon icon={faQuoteRight} className="ml-2" />
                </span>
              </div>

              {/* Nút thao tác */}
              <div className="flex justify-around py-4">
                <button onClick={() => handleNavigation("prev", profile, setCurrentProfile, setCurrentPost)}
                  className="p-3 bg-gray-700 rounded-full hover:scale-110 transition-transform">
                  <FontAwesomeIcon icon={faArrowLeft} className="text-yellow-500 w-8 h-8 text-2xl" />
                </button>
                <button onClick={() => setShowMatch(true)}
                  className="p-3 bg-gray-700 rounded-full hover:scale-125 transition-transform">
                  <FontAwesomeIcon icon={faHeart} className={`w-8 h-8 text-2xl ${colorClass}`} />
                </button>
                <div className="relative group/reactions flex items-center justify-between">
                  <button className="p-3 bg-gray-700 rounded-full hover:scale-110 transition-transform transform flex items-center">
                    {totalReaction}
                    {icons(reactionType)}
                  </button>
                  <div className="absolute -top-12 transform -translate-x-1/4 hidden group-hover/reactions:flex">
                    <Reactions postId={currentPostData.id} callTotal={updateTotalReaction} />
                  </div>
                </div>
                <button onClick={() => handleNavigation("next", profile, setCurrentProfile, setCurrentPost)}
                  className="p-3 bg-gray-700 rounded-full hover:scale-110 transition-transform">
                  <FontAwesomeIcon icon={faArrowRight} className="text-red-500 w-8 h-8 text-2xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TinderSwipe;
