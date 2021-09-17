import { useState } from "react/cjs/react.development";
import Layout from "../Layout/Layout";
import firebase from "../../firebase/initFirebase";
import "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import Loading from "../Loading/Loading";
import TopBarProgress from "react-topbar-progress-indicator";
import { useRouter } from "next/router";
export default function Upload() {
  const [file, setFile] = useState();
  const [uploadInfo, setUploadInfo] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [user, userLoading, userError] = useAuthState(firebase.auth());
  const router = useRouter();
  const handleChange = (e) => {
    setUploadInfo({ ...uploadInfo, coverImage: e.target.files[0] });
    setFile(URL.createObjectURL(e.target.files[0]));
  };
  const upload = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    // console.log(uploadInfo.description);
    // const docId = user.uid + "_" + uploadInfo.video.name;
    // save video to storage
    const videoStorageRef = firebase
      .storage()
      .ref("videos/" + user.uid + "/" + uploadInfo.video.name);
    await videoStorageRef.put(uploadInfo.video);

    // save cover image to storage
    const coverStorageRef = firebase
      .storage()
      .ref(
        "cover/" +
          user.uid +
          "/" +
          uploadInfo.video.name +
          "_" +
          uploadInfo.coverImage.name
      );
    await coverStorageRef.put(uploadInfo.coverImage);
    const videoId = user.uid + "_" + Math.random().toFixed(5) * 100000;
    firebase
      .firestore()
      .collection("videos")
      .doc(videoId)
      .set({
        displayName: user.displayName,
        photoURL: user.photoURL,
        views: 0,
        like: 0,
        belong: user.uid,
        uploadTime: firebase.firestore.Timestamp.now().toDate().toString(),
        videoId: videoId,
        videoPath: "videos/" + user.uid + "/" + uploadInfo.video.name,
        title: uploadInfo.title,
        description: uploadInfo.description,
        coverImagePath:
          "cover/" +
          user.uid +
          "/" +
          uploadInfo.video.name +
          "_" +
          uploadInfo.coverImage.name,
      })
      .then(async () => {
        const res = await firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get();
        const arr = res.get("videos");
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .update({
            videos: [...arr, videoId],
          })
          .then(() => {
            setIsUploading(false);
            window.location.reload();
          });
      });
  };
  const uploadData = (e) => {
    const { name, value } = e.target;
    setUploadInfo({ ...uploadInfo, [name]: value });
  };
  const uploadVideo = (e) => {
    setUploadInfo({ ...uploadInfo, video: e.target.files[0] });
  };
  {
    if (userLoading) {
      return <Loading />;
    } else {
      if (user) {
        return (
          <Layout>
            {isUploading ? <TopBarProgress /> : null}
            {isUploading ? <Loading isUpload={true} /> : null}
            <div className="w-full flex flex-col justify-center items-center mt-24 px-5 lg:py-5 lg:pl-0 lg:pr-10">
              <div className="flex items-center">
                <div>
                  <img
                    src="https://www.gstatic.com/youtube/img/creator/no_content_illustration_upload_video_v3_darkmode.svg"
                    alt=""
                  />
                </div>
                <h4 className="ml-5 font-bold text-white text-3xl md:text-4xl lg:text-5xl">
                  Upload Video
                </h4>
              </div>
              <div className="flex flex-col items-center w-full">
                <form onSubmit={upload} className=" w-full max-w-lg">
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-light-ele text-lg font-bold mb-2"
                        htmlFor="grid-first-name"
                      >
                        Title
                      </label>
                      <input
                        autoComplete="off"
                        pattern=".*\S+.*"
                        title="Fill In Title Here!!"
                        className="appearance-none block w-full bg-gray-200 text-ele border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-first-name"
                        type="text"
                        placeholder="Title"
                        name="title"
                        required
                        onChange={uploadData}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label
                        className="block uppercase tracking-wide text-light-ele text-lg font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Description
                      </label>
                      <pre>
                        <textarea
                          autoComplete="off"
                          pattern=".*\S+.*"
                          title="Fill In Description Here!!"
                          required
                          onChange={uploadData}
                          className="appearance-none block w-full bg-gray-200 text-ele border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-password"
                          type="password"
                          placeholder="Description..."
                          name="description"
                        />
                      </pre>

                      <p className="text-light-ele text-lg italic">
                        Make it as long and as crazy as you'd like
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-light-ele text-lg font-bold mb-2"
                        htmlFor="grid-first-name"
                      >
                        Image display on cover
                      </label>
                      <input
                        autoComplete="off"
                        title="Select Cover Image Here"
                        onChange={handleChange}
                        className="appearance-none block w-full bg-gray-200 text-ele border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-first-name"
                        type="file"
                        placeholder="Title"
                        accept="image/png, image/gif, image/jpeg"
                        required
                      />
                      <img src={file} alt="" className="my-5" />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-light-ele text-lg font-bold mb-2"
                        htmlFor="grid-first-name"
                      >
                        Video
                      </label>
                      <input
                        autoComplete="off"
                        title="Choose Your Video Here"
                        className="appearance-none block w-full bg-gray-200 text-ele border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-first-name"
                        type="file"
                        placeholder="Title"
                        accept="video/mp4,video/webm,video/ogg,.ogg"
                        name="video"
                        required
                        onChange={uploadVideo}
                      />
                    </div>
                  </div>
                  <button
                    title="Upload Now!!"
                    type="submit"
                    className="mx-auto w-full flex justify-center items-center rounded-full text-3xl self-center font-bold text-white bg-red-200 py-2 px-10 bg-light-ele ripple mb-10"
                  >
                    Upload
                  </button>
                </form>
              </div>
            </div>
          </Layout>
        );
      } else {
        return (
          <Layout>
            <Link href="/auth/authPage">
              <div className="cursor-pointer w-full flex flex-col justify-center items-center mt-24 px-5 lg:py-5 lg:pl-0 lg:pr-10">
                <span className="font-bold text-light-ele underline">
                  Sorry, you need to log in to upload videos...
                </span>
              </div>
            </Link>
          </Layout>
        );
      }
    }
  }
}
