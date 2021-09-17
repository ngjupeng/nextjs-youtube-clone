import { useEffect, useState } from "react";
import HistoryVideo from "../HistoryVideo/HistoryVideo";
import Layout from "../Layout/Layout";
import firebase from "../../firebase/initFirebase";
export default function History({ keyword }) {
  const [filteredVideos, setFilteredVideos] = useState();
  useEffect(async () => {
    const videos = await firebase.firestore().collection("videos").get();
    const filteredVideo = videos.docs.filter((value) => {
      return value.data().title.toLowerCase().includes(keyword);
    });
    setFilteredVideos(filteredVideo);
  }, []);
  return (
    <Layout>
      <div className="w-full flex flex-col mt-24 px-5 lg:py-5 lg:pl-0 lg:pr-10 text-white">
        <h3 className="mt-5 text-white font-bold text-3xl">Search Results</h3>
        <div className="w-auto">
          {filteredVideos ? (
            filteredVideos.length > 0 ? (
              filteredVideos.map((value) => {
                return <HistoryVideo key={value.id} {...value.data()} />;
              })
            ) : (
              <div className="mt-5">No match search result...</div>
            )
          ) : (
            <div className="mt-5">No match search result...</div>
          )}
        </div>
      </div>
    </Layout>
  );
}
