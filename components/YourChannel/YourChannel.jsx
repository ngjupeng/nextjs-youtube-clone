import VideoItem from "../VideoItem/VideoItem";
import Layout from "../Layout/Layout";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../firebase/initFirebase";
import Link from "next/link";
import Loading from "../Loading/Loading";
import { useEffect } from "react";
import { useState } from "react";
import LazyLoad from "react-lazyload";
export default function YourChannel(props) {
  const [user, loading, error] = useAuthState(firebase.auth());
  const [yourVideos, setYourVideos] = useState([]);
  useEffect(() => {
    async function fetchData() {
      if (user) {
        const videosData = await firebase
          .firestore()
          .collection("videos")
          .get();

        const myVideoArr = videosData.docs.filter((value) =>
          props.data.videos.includes(value.data().videoId)
        );
        setYourVideos(myVideoArr);
      }
    }
    fetchData();
  }, [user]);
  {
    if (loading) {
      return <Loading />;
    } else {
      if (user) {
        return (
          <Layout>
            <div className="w-full flex flex-col justify-center mt-16 px-5 lg:py-5 lg:pl-0 lg:pr-10">
              <div className="mt-3 lg:mt-0 w-full h-52 flex items-center">
                {/* profile pic */}
                <div className="w-32 overflow-hidden">
                  <img src={user.photoURL} alt="" className="w-full circular" />
                </div>
                <div className="ml-10">
                  <h3
                    onClick={() => test()}
                    className="font-bold text-white text-3xl md:text-4xl lg:text-5xl"
                  >
                    {user.displayName}
                  </h3>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gird-rows-auto content-center justify-center gap-y-10 gap-x-10">
                {yourVideos.map((value) => {
                  // console.log(value.data());
                  return (
                    <LazyLoad key={value.id} height={200} offset={100}>
                      <VideoItem {...value.data()} />
                    </LazyLoad>
                  );
                })}
              </div>
            </div>
          </Layout>
        );
      } else {
        return (
          <Layout>
            <Link href="/auth/authPage">
              <div className="cursor-pointer w-full flex flex-col justify-center items-center mt-24 px-5 lg:py-5 lg:pl-0 lg:pr-10">
                <span className="font-bold text-light-ele underline">
                  Sorry, you need to log in to manage your channel...
                </span>
              </div>
            </Link>
          </Layout>
        );
      }
    }
  }
}
