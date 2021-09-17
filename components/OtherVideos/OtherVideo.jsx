import React from "react";
import { useEffect, useState } from "react";
import "firebase/storage";
import firebase from "../../firebase/initFirebase";
export default function OtherVideo(props) {
  const [coverImage, setCoverImage] = useState();

  useEffect(async () => {
    const storage = firebase.storage();
    const pathReference = storage.ref(props.coverImagePath);
    const imageUrl = await pathReference.getDownloadURL();
    setCoverImage(imageUrl);
  }, []);
  return (
    <a href={"/video/" + props.videoId} className="cursor-pointer">
      <div className="cursor-pointer flex mb-5">
        <div className="w-3/5 md:w-2/5 h-40 overflow-hidden">
          <img src={coverImage} alt="" className="w-full h-full" />
        </div>
        <div className="flex flex-col px-3 w-2/5 md:w-3/5">
          <h3 className="line-clamp-2 font-bold text-white">{props.title}</h3>
          <h2 className="my-0 md:my-2 text-base lg:text-lg text-light-ele">
            {props.displayName}
          </h2>
          <p className="text-base lg:text-lg text-light-ele">
            {props.views} views
          </p>
        </div>
      </div>
    </a>
  );
}
