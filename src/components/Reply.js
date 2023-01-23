import { handler } from "@tailwindcss/line-clamp";
import axios from "axios";
import React, { useState } from "react";
import { API_BASE_URL } from "../config";
import { useUser } from "../contexts/UserContext";
import useClick from "../hooks/useClick";

export default function Reply({
  statuses,
  commentId,
  filmId,
  setComments,
  solveComments,
  emojis,
}) {
  const [user] = useUser();
  const [inputComment, setInputComment] = useState("");
  const [parentRefLike, childRefLike, openLike, setOpenLike] = useClick();
  const [parentRefRep, childRefRep, openRep, setOpenRep, closeRefRep] =
    useClick();

  function handleSubmitComment() {
    if (inputComment) {
      setOpenRep(false);
      setInputComment("");
      axios
        .post(`${API_BASE_URL}createComment`, {
          userId: user.id,
          accessToken: user.accessToken,
          content: inputComment,
          filmId: filmId,
          commentId: commentId,
        })
        .then(({ data }) => {
          setComments(solveComments(data));
        });
    }
  }

  function handleSubmitEmoji(statusId) {
    setOpenLike(false);
    axios
      .post(`${API_BASE_URL}createEmoji`, {
        userId: user.id,
        accessToken: user.accessToken,
        commentId: commentId,
        statusId: statusId,
      })
      .then(({ data }) => {
        setComments(solveComments(data));
      });
  }

  return (
    <div className={`${user ? "flex" : "hidden"} relative flex-col gap-y-3`}>
      <div className="flex items-center justify-start gap-x-2">
        <div
          ref={parentRefLike}
          className="font-semibold text-gray-700 cursor-pointer"
        >
          thích{" "}
          {user &&
            emojis
              .filter((emoji) => emoji.user.id == user.id)
              .map((emoji) => (
                <span
                  className={`${
                    emoji.status.id == 1
                      ? "text-blue-500"
                      : emoji.status.id == 2
                      ? "text-red-500"
                      : "text-yellow-500"
                  }`}
                >
                  <i className={emoji.status.name}></i>
                </span>
              ))}
        </div>
        <div
          ref={parentRefRep}
          className="font-semibold text-gray-700 cursor-pointer"
        >
          trả lời
        </div>
      </div>
      <div ref={childRefRep} className={`${openRep ? "block" : "hidden"}`}>
        <div className="flex items-start justify-start gap-x-2">
          <div className="w-10 h-10 overflow-hidden rounded-full">
            <img
              className="object-cover w-full h-full"
              src={user && user.image}
              alt=""
            />
          </div>
          <textarea
            value={inputComment}
            onChange={(e) => setInputComment(e.target.value)}
            class="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
            name="body"
            placeholder="trả lời bình luận"
          ></textarea>
        </div>
        <div className="flex items-center justify-end mt-2 gap-x-3">
          <button
            ref={closeRefRep}
            className="px-5 py-1 font-semibold text-white bg-red-600 rounded-lg"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmitComment}
            className="px-5 py-1 font-semibold text-white bg-blue-600 rounded-lg"
          >
            trả lời
          </button>
        </div>
      </div>
      <div
        ref={childRefLike}
        className={`${
          openLike ? "flex" : "hidden"
        } absolute left-0  items-center justify-start px-2 py-2 text-2xl bg-white shadow-lg rounded-2xl bottom-full gap-x-3`}
      >
        {statuses &&
          statuses.map((status) => (
            <span
              onClick={() => handleSubmitEmoji(status.id)}
              className={`${
                status.id === 1
                  ? "text-blue-500"
                  : status.id === 2
                  ? "text-red-500"
                  : "text-yellow-500"
              } text-2xl  cursor-pointer`}
            >
              <i className={status.name + " duration-100 hover:scale-150"}></i>
            </span>
          ))}
      </div>
    </div>
  );
}
