import Loader from "react-loader-spinner";

export default function Loading({ isUpload = false }) {
  return (
    <div className="w-full h-full bg-black bg-opacity-50 fixed top-0 left-0 flex flex-col justify-center items-center">
      <Loader type="Grid" color="red" height={100} width={100} />
      {isUpload ? (
        <h3 className="ml-5 lg:ml-0 mt-5 text-2xl lg:text-3xl text-light-ele">
          Please don&apos;t refresh/leave the page while the data is
          uploading...
        </h3>
      ) : null}
    </div>
  );
}
