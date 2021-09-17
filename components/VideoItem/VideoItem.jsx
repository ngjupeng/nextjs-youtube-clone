import React from "react";
import Link from "next/link";
import firebase from "../../firebase/initFirebase";
import "firebase/storage";
import { useEffect, useState } from "react";
export default function VideoItem(props) {
  const [coverImage, setCoverImage] = useState();

  useEffect(async () => {
    const storage = firebase.storage();
    const pathReference = storage.ref(props.coverImagePath);
    const imageUrl = await pathReference.getDownloadURL();
    setCoverImage(imageUrl);
  }, []);
  return (
    <Link href={"/video/" + props.videoId}>
      <div className="w-auto h-96 bg-transparent my-5 md:my-0 flex flex-col cursor-pointer justify-center items-center border-1 transition duration-200 border-transparent active:border-light-ele">
        <div className="overflow-hidden w-full h-64 lg:w-full">
          <img src={coverImage} alt="" className="w-full h-full" />
        </div>
        <div className="w-full h-32 p-1 flex items-center">
          <div className="w-2/12 mt-3 ml-1 md:ml-0 lg:ml-0 w-10 h-auto overflow-hidden rounded-full self-start bg-transparent">
            <img src={props.photoURL} alt="" className="w-full" />
          </div>
          <div className="h- w-10/12 h-full flex flex-col justify-center py-2 px-3">
            {/* title */}
            <h3 className="w-50 font-bold line-clamp-2 text-white">
              {props.title}
            </h3>
            {/* author */}
            <span className="text-light-ele my-1">{props.displayName}</span>
            <div className="text-light-ele">
              {/* view */}
              <span>{props.views} views</span>
              <span className="inline-block rounded-full mx-3 w-1.5 h-1.5 bg-light-ele"></span>
              {/* date */}
              <span>{props.uploadTime.substring(0, 15)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
