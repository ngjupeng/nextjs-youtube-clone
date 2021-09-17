import { useAuthState } from "react-firebase-hooks/auth";
import HistoryVideo from "../HistoryVideo/HistoryVideo";
import Layout from "../Layout/Layout";
import firebase from "../../firebase/initFirebase";
import Link from "next/link";
import LazyLoad from "react-lazyload";
import Loader from "react-loader-spinner";
export default function History({ hitsory }) {
  const [user, loading, error] = useAuthState(firebase.auth());
  {
    if (!user) {
      return (
        <Layout>
          <Link href="/auth/authPage">
            <div className="cursor-pointer w-full flex flex-col justify-center items-center mt-24 px-5 lg:py-5 lg:pl-0 lg:pr-10">
              <span className="font-bold text-light-ele underline">
                Sorry, after log in we will save your history watch videos
                here...
              </span>
            </div>
          </Link>
        </Layout>
      );
    } else {
      return (
        <Layout>
          <div className="w-full flex flex-col mt-24 px-5 lg:py-5 lg:pl-0 lg:pr-10 text-white">
            <h3 className="mt-5 text-white font-bold text-3xl">
              Watch history
            </h3>
            <div className="w-auto">
              {hitsory.map((value) => {
                return (
                  <LazyLoad
                    key={value.videoId}
                    height={100}
                    offset={[-100, 100]}
                  >
                    {" "}
                    <HistoryVideo key={value.videoId} {...value} />
                  </LazyLoad>
                );
              })}
            </div>
          </div>
        </Layout>
      );
    }
  }
}
