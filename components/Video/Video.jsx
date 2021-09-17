import React, { useRef } from "react";
import IcomoonReact, { iconList } from "icomoon-react";
import iconSet from "../../selection.json";
import Comment from "../Comment/Comment";
import OtherVideo from "../OtherVideos/OtherVideo";
import LayoutVideo from "../Layout/LayoutVideo";
import { useEffect, useState } from "react/cjs/react.development";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../firebase/initFirebase";
import Loader from "react-loader-spinner";
import Link from "next/link";
import LazyLoad from "react-lazyload";
export default function Video(props) {
  const [user, loading, error] = useAuthState(firebase.auth());
  const commentRef = useRef();
  const [related, setRelated] = useState();
  const [commentShow, setCommentShow] = useState(false);
  const [isBlank, setIsBlank] = useState(false);
  const [comments, setComments] = useState();
  const [viewsUpdate, setViewsUpdate] = useState(props.data.views);
  const [isLike, setIsLike] = useState(false);
  const [historyLike, setHistoryLike] = useState([]);
  const [likeCount, setLikeCount] = useState(props.data.like);
  useEffect(async () => {
    getComments();
    getRelatedVideos();
    updateHistory();
    checkLiked();
  }, [user]);
  const shuffleArray = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };
  const getComments = async () => {
    // load comments
    const commentRes = await firebase
      .firestore()
      .collection("videos")
      .doc(props.id)
      .collection("comments")
      .get();
    setComments(commentRes.docs);
  };
  const uploadComment = () => {
    // console.log(commentRef.current.value);
    if (commentRef.current.value.trim().length <= 0) {
      setIsBlank(true);
    } else {
      firebase
        .firestore()
        .collection("videos")
        .doc(props.id)
        .collection("comments")
        .add({
          content: commentRef.current.value,
          commentTime: firebase.firestore.Timestamp.now().toDate(),
          photoURL: user.photoURL,
          displayName: user.displayName,
          likes: 0,
        })
        .then(() => {
          commentRef.current.value = "";
          setCommentShow(false);
          setIsBlank(false);
          getComments();
        });
    }
  };
  const getRelatedVideos = async () => {
    // get related videos
    const res = await firebase.firestore().collection("videos").limit(10).get();
    // console.log(res);
    const relatedVideos = res.docs.filter(
      (value) => value.data().videoId !== props.id
    );
    shuffleArray(relatedVideos);
    setRelated(relatedVideos);
  };
  const updateHistory = async () => {
    // update user history
    if (user) {
      const res = await firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .get();
      const historyData = res.get("history");
      if (!historyData.includes(props.id)) {
        await firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .update({
            history: [...historyData, props.id],
          });
        // update videos views
        const videoInfo = await firebase
          .firestore()
          .collection("videos")
          .doc(props.id)
          .get();
        let viewNow = videoInfo.get("views");
        viewNow++;
        await firebase.firestore().collection("videos").doc(props.id).update({
          views: viewNow,
        });
        setViewsUpdate(viewNow);
      }
    }
  };
  const checkLiked = async () => {
    if (user) {
      const userInfo = await firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .get();
      const getUserIsLike = await userInfo.get("likes");
      setHistoryLike(getUserIsLike);
      if (getUserIsLike.includes(props.id)) {
        setIsLike(true);
      } else {
        setIsLike(false);
      }
    }
  };
  const like = async () => {
    if (user) {
      // console.log("like");
      setIsLike(true);
      let allLikes = [...historyLike, props.id];
      let likeTemp = likeCount + 1;
      setLikeCount(likeTemp);
      // console.log(allLikes);
      // update user
      await firebase.firestore().collection("users").doc(user.uid).update({
        likes: allLikes,
      });
      // update to video
      await firebase.firestore().collection("videos").doc(props.id).update({
        like: likeTemp,
      });
      setHistoryLike(allLikes);
    } else {
      // remind user to sign in
    }
  };
  const unlike = async () => {
    if (user) {
      // console.log("unlike");
      setIsLike(false);
      const index = historyLike.indexOf(props.id);
      let likeTemp = likeCount - 1;
      setLikeCount(likeTemp);
      if (index > -1) {
        const tempArr = historyLike;
        tempArr.splice(index, 1);
        setHistoryLike(tempArr);
        await firebase.firestore().collection("users").doc(user.uid).update({
          likes: tempArr,
        });
        await firebase.firestore().collection("videos").doc(props.id).update({
          like: likeTemp,
        });
      }
    }
  };
  return (
    <LayoutVideo>
      <div className="flex flex-col lg:flex-row w-full mt-24 py-5 pl-3 pr-3  lg:pl-10 lg:pr-10">
        {/* video container */}
        <div className="flex flex-col w-full lg:w-3/5 h-auto">
          <video autoPlay controls className="w-full">
            <source src={props.videoUrl} type="video/webm" />
            <source src={props.videoUrl} type="video/mp4" />
            <source src={props.videoUrl} type="video/ogg" />
            Sorry, your browser doesn&apos;t support embedded videos.
          </video>
          {/* details */}
          <div className="my-5 text-white">
            <h3 className="text-xl md:text-2xl lg:text-3xl">
              {props.data.title}
            </h3>
            <div className="py-5 text-lg text-light-ele flex justify-between items-center border-b-2 border-light-ele">
              <div className="pl-3 flex items-center">
                <span>
                  {viewsUpdate === props.data.views
                    ? props.data.views
                    : viewsUpdate}{" "}
                  views
                </span>
                <span className="inline-block rounded-full mx-2 lg:mx-3 w-1.5 h-1.5 bg-light-ele"></span>
                <span>{props.data.uploadTime.substring(0, 15)}</span>
              </div>
              <div className="py-1 ">
                <div className="flex items-center pr-3">
                  {isLike ? (
                    <div
                      className="circular py-2 ripple cursor-pointer"
                      onClick={unlike}
                    >
                      <IcomoonReact
                        iconSet={iconSet}
                        color="#fff"
                        size="30"
                        icon="thumbs-up"
                        className="mx-3"
                      />
                    </div>
                  ) : (
                    <div
                      className="circular py-2 ripple cursor-pointer"
                      onClick={like}
                    >
                      <IcomoonReact
                        iconSet={iconSet}
                        color="#fff"
                        size="30"
                        icon="thumbs-o-up"
                        className="mx-3"
                      />
                    </div>
                  )}

                  <span>
                    {likeCount === props.data.like
                      ? props.data.like
                      : likeCount}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* userinfo and video desc */}
          <div className="px-5 pb-5 flex flex-col lg:flex-row border-b-2 border-light-ele">
            {/* avatar */}
            <div className="mb-5 lg:mb-0 overflow-hidden w-32 mx-0 lg:mx-5">
              <img
                src={props.data.photoURL}
                alt=""
                className="w-auto circular"
              />
            </div>
            <div className="flex flex-col">
              <h4 className="text-lg md:text-xl lg:text-2xl font-medium text-white font-roboto">
                {props.data.displayName}
              </h4>
              <p className="whitespace-pre-line my-5 text-white text-base md:text-lg lg:text-xl">
                {props.data.description}
              </p>
            </div>
          </div>
          <div className="text-white my-5">
            <p className="text-2xl">
              {comments ? comments.length : 0} comments
            </p>
            {loading ? (
              <div className="flex justify-center items-center">
                <Loader type="TailSpin" color="red" height={100} width={100} />
              </div>
            ) : user ? (
              <div
                onFocus={() => setCommentShow(true)}
                className="flex flex-col"
              >
                <div className="mt-10 flex items-center">
                  <div className="w-32 my-5 mr-8 overflow-hidden">
                    <img
                      src={user.photoURL}
                      alt=""
                      className="circular w-auto"
                    />
                  </div>
                  <input
                    ref={commentRef}
                    type="text"
                    className="h-20 w-full outline-none  text-light-ele mr-5 px-5 text-xl border-b-2 border-light-ele bg-transparent"
                    placeholder="Add a public comment..."
                  />
                </div>
                {commentShow ? (
                  <div className="relative self-end">
                    <button
                      className="bg-side-main py-2 px-4 text-2xl rounded transition duration-100 hover:bg-red-700"
                      onClick={uploadComment}
                    >
                      COMMENT
                    </button>
                    <div
                      className={
                        "absolute text-red-600 text-lg " +
                        (isBlank ? " block" : "hidden")
                      }
                    >
                      Cant comment a blank content...
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <Link href="/auth/authPage">
                <div className="cursor-pointer text-light-ele underline flex justify-center items-center text-2xl font-serif">
                  After sign in you can add comment here...
                </div>
              </Link>
            )}
            <div className="flex w-full flex-col mt-10">
              {comments ? (
                comments.length > 0 ? (
                  comments.map((value) => {
                    // console.log(comments);
                    return <Comment key={value.id} {...value.data()} />;
                  })
                ) : (
                  <div className="flex justify-center items-center mt-10 text-light-ele text-xl">
                    No comments on this video yet...
                  </div>
                )
              ) : (
                <div className="flex justify-center items-center mt-10 text-light-ele text-xl">
                  Loading
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full lg:w-2/5 h-auto p-3 lg:p-10">
          {related ? (
            related.map((value) => {
              return (
                <LazyLoad key={value.data().videoId} height={200} offset={100}>
                  <OtherVideo {...value.data()} />
                </LazyLoad>
              );
            })
          ) : (
            <span>Loading...</span>
          )}
        </div>
      </div>
    </LayoutVideo>
  );
}
