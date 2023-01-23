import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation } from "swiper";
import { useUser } from "../contexts/UserContext";
import Pusher from "pusher-js";
import "swiper/css";
import "swiper/css/navigation";
import useClick from "../hooks/useClick";
import {
  getApiUrlActor,
  getApiUrlDetail,
  getApiUrlVideo,
  getImageUrl,
} from "../helper";
import AppLayout from "../layouts/AppLayout";
import { API_BASE_URL, PUSHER_APP_KEY, PUSHER_CLUSTER } from "../config";
import Reply from "../components/Reply";
import Emoji from "../components/Emoji";

export default function DetailPage() {
  function solveCommments(comments) {
    function solve(arrayResult = [], index) {
      for (let i = 0; i < comments.length; i++) {
        if (arrayResult.length === 0) {
          if (comments[i].id === null) {
            arrayResult.push(i);
            solve(arrayResult, i);
          }
        } else {
          if (comments[i].comment_id === comments[index].id) {
            arrayResult.push(i);
            solve(arrayResult, i);
          }
        }
      }
      return arrayResult;
    }

    comments.push({ id: null });
    const result = solve().map((index) => comments[index]);
    result.shift();
    return result;
  }

  const { filmId, commentId } = useParams();
  const [detail, setDetail] = useState();
  const [user] = useUser();
  const [comments, setComments] = useState([]);
  const [statuses, setStatuses] = useState();
  const [inputComment, setInputComment] = useState("");
  const [
    parentRefComment,
    childRefComment,
    openComment,
    setOpenComment,
    closeCommentRef,
  ] = useClick();
  useEffect(() => {
    axios.get(`${API_BASE_URL}statuses`).then(({ data }) => setStatuses(data));
  }, []);
  useEffect(() => {
    axios.get(getApiUrlDetail(filmId)).then(({ data }) => {
      axios.get(getApiUrlVideo(filmId)).then(({ data: { results } }) => {
        axios
          .get(getApiUrlActor(filmId))
          .then(({ data: { cast } }) =>
            setDetail({ ...data, videos: results, actors: cast })
          );
      });
    });
  }, [filmId]);
  useEffect(() => {
    axios
      .post(`${API_BASE_URL}comments`, { filmId: filmId })
      .then(({ data }) => setComments(solveCommments(data)));
  }, [filmId]);

  function handleSubmit(e) {
    e.preventDefault();
    setInputComment("");
    if (inputComment)
      axios
        .post(`${API_BASE_URL}createComment`, {
          userId: user.id,
          accessToken: user.accessToken,
          content: inputComment,
          filmId: filmId,
        })
        .then(({ data }) => {
          setComments(solveCommments(data));
        });
  }

  function handleRemoveComment(comment) {
    axios
      .post(`${API_BASE_URL}removeComment`, {
        userId: user.id,
        accessToken: user.accessToken,
        commentId: comment.id,
      })
      .then(({ data }) => setComments(solveCommments(data)));
  }

  useEffect(() => {
    const pusher = new Pusher(PUSHER_APP_KEY, {
      cluster: PUSHER_CLUSTER,
    });
    const channel = pusher.subscribe(`comment.${filmId}`);
    channel.bind("CommentEvent", function ({ data }) {
      setComments(solveCommments(data.comments));
    });
    return () => pusher.unsubscribe(`comment.${filmId}`);
  }, [filmId]);

  return (
    <AppLayout>
      {detail && (
        <div className="w-[1400px] px-3 py-10 mx-auto max-w-full flex flex-col gap-y-10">
          <div className="w-full h-[350px] md:h-[600px] relative">
            <img
              className="object-cover w-full h-full"
              src={getImageUrl(detail.backdrop_path)}
              alt=""
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>
          <div className="hidden lg:block w-[800px] h-[360px] mx-auto rounded-lg overflow-hidden mt-[-180px] relative z-10 shadow-lg">
            <img
              className="object-cover w-full h-full"
              src={getImageUrl(detail.poster_path)}
              alt=""
            />
          </div>
          <div className="flex flex-col items-center mt-8 gap-y-5">
            <h3 className="text-xl font-semibold text-white md:text-3xl">
              {detail.title}
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-x-5 md:gap-y-3">
              {detail.genres.map((category) => (
                <span className="px-2 py-1 text-sm font-semibold border rounded-md md:text-base md:px-5 md:py-3 text-primary border-primary">
                  {category.name}
                </span>
              ))}
            </div>
            <div className="text-center text-white w-[800px] mx-auto max-w-full">
              {detail.overview}
            </div>
          </div>
          <div className="actors">
            <Swiper
              grabCursor="true"
              spaceBetween={20}
              slidesPerView="auto"
              updateOnWindowResize
            >
              {detail.actors.slice(0, 10).map((actor) => (
                <SwiperSlide>
                  <div className="text-white w-[300px] flex flex-col gap-y-3">
                    <img
                      className="object-cover w-full rounded-md"
                      src={getImageUrl(actor.profile_path)}
                      alt=""
                    />
                    <div className="flex flex-wrap items-center justify-center gap-x-2">
                      <span className="font-semibold">{actor.name}</span>
                      <span>"{actor.character}"</span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div>
            <Swiper navigation={true} modules={[Navigation]}>
              {detail.videos.map((video) => (
                <SwiperSlide>
                  <div key={video.id} className="w-full aspect-auto">
                    <div className="w-full aspect-video">
                      <iframe
                        className="object-fill w-full h-full"
                        src={`https://www.youtube.com/embed/${video.key}`}
                        title={video.name}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div></div>
        </div>
      )}
      <button
        ref={parentRefComment}
        className={`${
          comments ? "flex" : "hidden"
        } fixed z-50 items-center justify-center px-3 py-1 bg-white shadow-lg rounded-xl md:left-10 left-2 bottom-2 text-primary gap-x-2 md:bottom-10`}
      >
        <span>
          <i class="fa-solid fa-comments"></i>
        </span>
        <span className="font-bold">Bình Luận</span>
      </button>
      <div
        ref={childRefComment}
        className={`${
          openComment ? "flex " : "hidden "
        } fixed inset-1 md:top-0 overflow-y-auto md:left-0 md:bottom-0 md:w-[700px] bg-white z-50 px-3 py-2 rounded-lg md:rounded-none md:px-8 md:py-5 flex-col gap-y-5`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold text-gray-700">
            {comments.length} bình luận
          </span>
          <button ref={closeCommentRef} className="text-3xl text-primary">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        {user && (
          <div className="flex items-start justify-start gap-x-1">
            <img
              className="object-cover w-10 h-10 rounded-full shadow-md"
              src={user.image}
              alt=""
            />
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-end flex-grow gap-y-1"
            >
              <textarea
                value={inputComment}
                onChange={(e) => setInputComment(e.target.value)}
                class="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                name="content"
                placeholder="nội dung bình luận"
              ></textarea>
              <button
                type="submit"
                className="px-5 py-2 font-semibold text-white bg-blue-600 rounded-md"
              >
                bình luận
              </button>
            </form>
          </div>
        )}
        <div className="flex flex-col gap-y-3">
          {comments.map((comment) => (
            <div
              className={`${
                comment.comment_id && "ml-12 border-l border-primary pl-2"
              } flex items-start justify-start gap-x-2`}
            >
              <div className="flex-shrink-0 w-10 h-10 overflow-hidden rounded-full shadow-md">
                <img
                  className="object-cover w-full h-full"
                  src={comment.user.image}
                  alt=""
                />
              </div>
              <div className="relative flex-grow">
                <div
                  className={`${
                    comment.id == commentId ? "bg-gray-400" : "bg-gray-200"
                  } flex flex-col px-3 py-2 rounded-md gap-y-1`}
                >
                  <span className="font-bold">
                    <span>{comment.user.name}</span>
                    {comment.comment_id && (
                      <span>
                        <span className="text-sm font-normal"> trả lời </span>
                        <span>
                          {comments
                            .filter(
                              (comment_) => comment_.id === comment.comment_id
                            )[0]
                            .user.name.split(" ")
                            .pop()}
                        </span>
                      </span>
                    )}
                  </span>
                  <div className={`mt-1 break-all`}>{comment.content}</div>
                  <span className="text-gray-600 ">
                    {comment.created_at.split(".").shift().replace("T", " ")}
                  </span>
                  <div className="relative flex items-center justify-start gap-x-2">
                    {comment.emojis
                      .reduce((prev, cur) => {
                        let isExisted = false;
                        prev.forEach((item) => {
                          if (cur.status.id === item.id) {
                            item.users.push(cur.user);
                            isExisted = true;
                          }
                        });
                        if (!isExisted) {
                          prev.push({
                            id: cur.status.id,
                            name: cur.status.name,
                            users: [{ ...cur.user }],
                          });
                        }
                        return prev;
                      }, [])
                      .map((status) => (
                        <Emoji status={status}></Emoji>
                      ))}
                    <div
                      className={`${
                        comment.emojis.length ? "flex" : "hidden"
                      } items-center justify-center w-6 h-6 text-white bg-gray-600 rounded-full`}
                    >
                      {comment.emojis.length}
                    </div>
                    {/* {user && comment.user.id == user.id && (
                      <div
                        onClick={() => handleRemoveComment(comment)}
                        className="absolute bottom-0 right-0 text-lg font-semibold cursor-pointer text-primary"
                      >
                        xóa
                      </div>
                    )} */}
                  </div>
                </div>
                <div>
                  <Reply
                    filmId={filmId}
                    commentId={comment.id}
                    statuses={statuses}
                    setComments={setComments}
                    solveComments={solveCommments}
                    emojis={comment.emojis}
                  ></Reply>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
