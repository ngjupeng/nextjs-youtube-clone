import React from "react";
import Video from "../../components/Video/Video";
import firebase from "../../firebase/initFirebase";
import Head from "next/head";
import "firebase/storage";
export default function VideoId(props) {
  return (
    <div>
      <Head>
        <title>{props.data.title}</title>
      </Head>
      <Video id={props.id} videoUrl={props.videoUrl} data={props.data} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const videoId = context.params.videoId;
  const res = await firebase
    .firestore()
    .collection("videos")
    .doc(videoId)
    .get();
  // user modified the url
  if (!res.exists) {
    context.res.statusCode = 302;
    context.res.setHeader("Location", `/404`); // Replace <link> with your url link
    context.res.end();
    return {
      props: {},
    };
  } else {
    const info = res.data();
    const storage = firebase.storage();
    const path = storage.ref(info.videoPath);
    const videoUrl = await path.getDownloadURL();

    return {
      props: {
        id: videoId,
        data: info,
        videoUrl,
      },
    };
  }
}
