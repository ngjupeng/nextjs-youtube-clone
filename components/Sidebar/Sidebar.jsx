import IcomoonReact, { iconList } from "icomoon-react";
import iconSet from "../../selection.json";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { useSnackbar } from "react-simple-snackbar";
export default function Sidebar() {
  const router = useRouter();
  const [openSnackbar, closeSnackbar] = useSnackbar({
    style: {
      fontSize: "30px",
    },
  });
  const redirecturl = (url) => {
    router.push(url);
  };
  return (
    <div className="w-1/10 hidden lg:block fixed left-0 top-0 bg-side-main h-screen pt-32 overflow-ellipsis">
      {/* sidebar */}
      <div className="w-full flex flex-col items-center">
        <div
          onClick={() => redirecturl("/")}
          className="w-full cursor-pointer flex flex-col items-center my-5 px-3 py-3 hover:bg-hover-ele"
        >
          {" "}
          <IcomoonReact
            iconSet={iconSet}
            color="white"
            size="35"
            icon="home3"
          />
          <p className="text-white text-base">Home</p>
        </div>
        <div
          onClick={() => openSnackbar("Sorry I didnt add that feature...")}
          className="w-full cursor-pointer flex flex-col items-center my-5 px-3 py-3 hover:bg-hover-ele"
        >
          <IcomoonReact
            iconSet={iconSet}
            color="white"
            size="35"
            icon="safari"
          />
          <p className="text-white">Explore</p>
        </div>
        <div
          onClick={() => openSnackbar("Sorry I didnt add that feature...")}
          className="w-full cursor-pointer overflow-ellipsis flex flex-col items-center my-5 px-0.5 py-3 hover:bg-hover-ele"
        >
          {" "}
          <IcomoonReact
            iconSet={iconSet}
            color="white"
            size="35"
            icon="subscriptions"
          />
          <p className="w-full truncate text-white">Subscriptions</p>
        </div>
        <div
          onClick={() => openSnackbar("Sorry I didnt add that feature...")}
          className="w-full cursor-pointer flex flex-col items-center my-5 px-3 py-3 hover:bg-hover-ele"
        >
          {" "}
          <IcomoonReact
            iconSet={iconSet}
            color="white"
            size="35"
            icon="video_library"
          />
          <p className="text-white">Library</p>
        </div>
      </div>
    </div>
  );
}
