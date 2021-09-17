import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import firebase from "../../firebase/initFirebase";
import "firebase/storage";
import Link from "next/link";

export default function HistoryVideo(props) {
  const [coverImage, setCoverImage] = useState();
  useEffect(() => {
    async function fetchData() {
      const storage = firebase.storage();
      const pathReference = storage.ref(props.coverImagePath);
      const imageUrl = await pathReference.getDownloadURL();
      setCoverImage(imageUrl);
    }
    fetchData();
  }, []);
  return (
    <Link href={"/video/" + props.videoId}>
      <div className="cursor-pointer w-full md:w-4/5 lg:w-1/2 flex mt-5 mb-5">
        <div className="w-full h-64 lg:h-72 overflow-hidden md:w-1/2">
          <img src={coverImage} alt="" className="w-full h-full" />
        </div>
        <div className="hidden md:block ml-5 w-1/2">
          <h3 className="line-clamp-2 text-xl md:text-2xl lg:text-3xl">
            {props.title}
          </h3>
          <span className="inline-block my-2 lg:my-5 text-light-ele">
            {props.displayName}
          </span>
          <p className="line-clamp-2 text-light-ele">{props.description}</p>
        </div>
      </div>
    </Link>
  );
}
