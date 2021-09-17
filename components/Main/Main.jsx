import React from "react";
import VideoItem from "../VideoItem/VideoItem";
import LazyLoad from "react-lazyload";

export default function Main({ data }) {
  return (
    <div className="w-full text-white h-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 grid-rows-auto justify-center gap-y-2 md:gap-y-10 gap-x-10">
      {data.map((value) => {
        return (
          <LazyLoad key={value.videoId} height={200} offset={100}>
            <VideoItem {...value} />
          </LazyLoad>
        );
      })}
    </div>
  );
}
