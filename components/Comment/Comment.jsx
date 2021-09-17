import React from "react";
export default function Comment(props) {
  return (
    <div className="flex mb-5">
      <div className="w-32 overflow-hidden">
        <img src={props.photoURL} alt="" className="circular w-auto" />
      </div>
      <div className="flex flex-col">
        <h4 className="font-medium text-white text-2xl">{props.displayName}</h4>
        <p className="my-2 text-lg">{props.content}</p>
      </div>
    </div>
  );
}
