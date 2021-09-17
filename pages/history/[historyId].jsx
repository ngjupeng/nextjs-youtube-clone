import React from "react";
import History from "../../components/History/History";
import firebase from "../../firebase/initFirebase";
import Head from "next/head";
export default function history(props) {
  return (
    <div className="flex flex-col">
      <Head>
        <title>History - YouTubeClone</title>
      </Head>
      <History hitsory={props.historyVideos} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const id = context.params.historyId;
  // console.log(id);
  const res = await firebase.firestore().collection("users").doc(id).get();
  // user modified the url
  if (id === "noSignIn") {
    // context.res.statusCode = 302;
    // context.res.setHeader("Location", `/history/noSignIn`); // Replace <link> with your url link
    // context.res.end();
    return {
      props: {},
    };
  } else if (!res.exists) {
    context.res.statusCode = 302;
    context.res.setHeader("Location", `/404`); // Replace <link> with your url link
    context.res.end();
    return {
      props: {},
    };
  } else if (res.exists) {
    const history = res.get("history");
    history.reverse();
    // console.log(history);
    let historyVideos = [];
    let finalHistory = [];
    const videos = await firebase.firestore().collection("videos").get();
    historyVideos = videos.docs.filter((value) => {
      if (history.includes(value.data().videoId)) {
        return value.data();
      }
    });

    historyVideos = historyVideos.map((value) => value.data());
    // console.log(historyVideos.length);
    // console.log(history);
    for (var i = 0; i < history.length; i++) {
      for (var j = 0; j < historyVideos.length; j++) {
        if (history[i] === historyVideos[j].videoId) {
          finalHistory.push(historyVideos[j]);
        }
      }
    }
    // console.log(finalHistory);
    return {
      props: { historyVideos: finalHistory },
    };
  }
}
