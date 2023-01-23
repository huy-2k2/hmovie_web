import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputSearch from "./InputSearch";
import useClick from "../hooks/useClick";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  API_BASE_URL,
  FACEBOOK_APP_ID,
  PUSHER_APP_KEY,
  PUSHER_CLUSTER,
} from "../config";
import { useUser } from "../contexts/UserContext";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useCategories } from "../contexts/CategoriesContext";
import Pusher from "pusher-js";
import { useNotifis } from "../contexts/NotifisContext";

export default function Header() {
  const [parentSearchRef, childSearchRef, openSearch] = useClick();
  const [parentCatRef, childCatRef, openCat, setOpenCat] = useClick();
  const [categories] = useCategories();
  const [parentNotifiRef, childNotifiRef, openNotifi, setOpenNotifi] =
    useClick();
  const [user, setUser] = useUser();
  const [notifis, setNotifis] = useNotifis();
  const navigate = useNavigate();
  function responseFacebook(response) {
    const userTemp = {
      name: response.name,
      id: response.id,
      accessToken: response.accessToken,
      image: response.picture.data.url,
    };
    axios
      .post(`${API_BASE_URL}login`, { ...userTemp })
      .then(({ data }) => setUser({ ...userTemp, accessToken: data }));
  }

  function handleClickNotifi(notifi) {
    setOpenNotifi(false);
    navigate(`/detail/${notifi.film_id}/${notifi.comment_id}`);
    if (!notifi.readed_at)
      axios
        .post(`${API_BASE_URL}markNotifiReaded`, {
          userId: user.id,
          accessToken: user.accessToken,
          notifiId: notifi.id,
        })
        .then(({ data }) => {
          setNotifis(
            notifis.map((item) => {
              if (item.id == notifi.id) return { ...item, readed_at: data };
              return { ...item };
            })
          );
        });
  }

  function handleDeleteNotifi(notifi, e) {
    e.stopPropagation();
    axios
      .post(`${API_BASE_URL}deleteNotifi`, {
        userId: user.id,
        accessToken: user.accessToken,
        notifiId: notifi.id,
      })
      .then(({ data }) => {
        setNotifis(notifis.filter((item) => item.id != notifi.id));
      });
  }

  useEffect(() => {
    if (user) {
      const pusher = new Pusher(PUSHER_APP_KEY, {
        cluster: PUSHER_CLUSTER,
      });
      const channel = pusher.subscribe(`notifi.${user.id}`);
      channel.bind("NotifiEvent", function ({ data }) {
        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setNotifis([data.notifi, ...notifis]);
      });
      return () => pusher.unsubscribe(`notifi.${user.id}`);
    }
  }, [notifis, setNotifis, user]);

  return (
    <div className="flex flex-col bg-menu gap-y-1">
      <div className="w-[1400px] max-w-full mx-auto px-3 h-[60px] flex items-center justify-start">
        <Link to="/">
          <div className="sm:w-[120px] w-[60px]">
            <img src="/images/logoBig.png" alt="" />
          </div>
        </Link>
        <div className="relative flex items-center h-full ml-2 text-white cursor-pointer sm:ml-8">
          <div className="flex items-center gap-x-1" ref={parentCatRef}>
            <span className="text-xs font-medium capitalize sm:text-base">
              Thể loại
            </span>
            <i class="fa-solid fa-caret-down mt-1"></i>
          </div>
          <div
            ref={childCatRef}
            className={`${
              openCat ? "block" : "hidden"
            } absolute top-full rounded-md left-[-80px] sm:left-0 w-max px-5 py-3 grid grid-cols-2 lg:grid-cols-3 gap-x-5 sm:gap-x-8 gap-y-4 bg-black bg-opacity-80 z-50 shadow-lg`}
          >
            <span className="absolute border-[10px] top-0 left-24 sm:left-8 -translate-y-full border-transparent border-b-gray-700"></span>
            {categories &&
              categories.map((category) => (
                <Link
                  onClick={() => setOpenCat(false)}
                  to={`/genre/${category.id}/${category.name}`}
                  key={category.id}
                  className="text-xs capitalize cursor-pointer sm:text-base hover:text-gray-200"
                >
                  {category.name}
                </Link>
              ))}
          </div>
        </div>
        <div className="relative flex items-center justify-start h-full ml-auto sm:gap-x-8 gap-x-5">
          <div className="hidden lg:block w-[400px]">
            <InputSearch></InputSearch>
          </div>
          <div
            ref={parentSearchRef}
            className="block text-lg text-white cursor-pointer lg:hidden"
          >
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
          <div className="flex items-center h-full">
            <div
              ref={parentNotifiRef}
              className="relative flex items-center justify-start text-white cursor-pointer gap-x-1"
            >
              <span className="text-xl">
                <i class="fa-solid fa-bell"></i>
              </span>
              <span>
                <i class="fa-solid fa-caret-down"></i>
              </span>
              {notifis && (
                <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-white -translate-y-[8px] font-semibold rounded-full bg-primary">
                  {notifis.filter((notifi) => !notifi["readed_at"]).length}
                </span>
              )}
            </div>
            <div
              ref={childNotifiRef}
              className={`${
                openNotifi ? "flex" : "hidden"
              } rounded-md flex-col max-h-[450px] overflow-y-auto absolute z-50 gap-y-5 w-[320px] bg-black shadow-2xl px-3 py-5 top-full right-0`}
            >
              {notifis &&
                notifis.map((notifi) => (
                  <div
                    onClick={() => handleClickNotifi(notifi)}
                    className="relative flex items-start justify-start cursor-pointer gap-x-3"
                  >
                    <div
                      className={`${
                        notifi.readed_at ? "hidden" : "block"
                      } absolute top-0 left-0 w-3 h-3 rounded-full bg-primary`}
                    ></div>
                    <div
                      onClick={(e) => handleDeleteNotifi(notifi, e)}
                      className="absolute bottom-0 right-0 flex items-center justify-center w-6 h-6 text-xl font-bold text-white rounded-full bg-primary"
                    >
                      <i class="fa-solid fa-xmark"></i>
                    </div>
                    <div className="flex-shrink-0 w-10 h-10 overflow-hidden rounded-full">
                      <img
                        className="object-cover w-full h-full"
                        src={notifi.user.image}
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col flex-grow text-white gap-y-1">
                      <div className="">
                        <span className="text-lg font-semibold text-gray-300">
                          {notifi.user.name}
                        </span>
                        <span>
                          {notifi.emoji
                            ? " đã bày tỏ cảm xúc về bình luận của bạn"
                            : " đã trả lời bình luận của bạn"}
                        </span>
                      </div>
                      <span className="font-semibold">
                        {notifi.created_at.split(".").shift().replace("T", " ")}
                      </span>
                    </div>
                  </div>
                ))}
              <span className="absolute top-0 -translate-y-full left-1/2  translate-x-8 border-[10px] border-transparent border-b-gray-700"></span>
            </div>
          </div>
          <div>
            {user ? (
              <div className="flex items-center justify-start gap-x-2">
                <div className="w-10 h-10 overflow-hidden rounded-full">
                  <img
                    className="object-cover w-full h-full"
                    src={user.image}
                    alt=""
                  />
                </div>
                <span className="font-semibold text-white">
                  {user.name.split(" ").pop()}
                </span>
              </div>
            ) : (
              <FacebookLogin
                appId={FACEBOOK_APP_ID}
                autoLoad
                fields="name,picture"
                callback={responseFacebook}
                render={(renderProps) => (
                  <button
                    onClick={renderProps.onClick}
                    className="px-3 py-2 text-xs font-semibold text-white rounded-md bg-primary sm:text-base"
                  >
                    Đăng nhập
                  </button>
                )}
              />
            )}
          </div>
        </div>
      </div>
      <div
        ref={childSearchRef}
        className={`${
          openSearch ? "block lg:hidden" : "hidden"
        } mx-auto px-5 w-full max-w-full mb-2`}
      >
        <InputSearch></InputSearch>
      </div>
    </div>
  );
}
