import IcomoonReact, { iconList } from "icomoon-react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import iconSet from "../../selection.json";
import Link from "next/link";
import { useRef, useState } from "react";
import ReactTooltip from "react-tooltip";
import { useRouter } from "next/router";
import { useSnackbar } from "react-simple-snackbar";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../firebase/initFirebase";
export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isInfo, setInfo] = useState(false);
  const dSearchRef = useRef();
  const mSearchRef = useRef();
  const [openSnackbar, closeSnackbar] = useSnackbar({
    style: {
      fontSize: "20px",
    },
  });
  const router = useRouter();
  const [user, userLoading, userError] = useAuthState(firebase.auth());
  const redirentTo = (url) => {
    setIsOpen(false);
    router.push(url);
  };
  const toggleDrawer = () => {
    setIsOpen((isOpen) => !isOpen);
  };
  const changeInfo = () => {
    setInfo(!isInfo);
  };
  const search = () => {
    window.location.replace("/search/" + dSearchRef.current.value);
  };
  const mSearch = () => {
    window.location.replace("/search/" + mSearchRef.current.value);
  };
  return (
    <div className="fixed left-0 top-0 px-3 md:py-5 md:px-9 h-24 w-screen bg-side-main flex items-center justify-between z-50">
      <div className="flex items-center">
        {/* hamburger */}
        <div className="mr-3 cursor-pointer" onClick={toggleDrawer}>
          <IcomoonReact iconSet={iconSet} color="#fff" size="30" icon="menu" />
        </div>
        {/* logo */}
        <h1
          className={
            "md-1 md:ml-3 font-roboto font-bold text-white text-xl md:text-2xl md:block lg:text-3xl " +
            (isSearch ? "hidden" : "block")
          }
        >
          <Link href="/">YouTubeClone</Link>
        </h1>
      </div>
      {isSearch ? (
        <div
          className="md:hidden cursor-pointer"
          onClick={() => setIsSearch(false)}
        >
          <IcomoonReact
            iconSet={iconSet}
            color="#fff"
            size="25"
            icon="arrow-left2"
          />
        </div>
      ) : null}
      {/* search */}
      {/* desktop search */}
      <div className="hidden md:grid md:w-2/5 grid-column-80-20 grid-rows-1 rounded overflow-hidden">
        <input
          ref={dSearchRef}
          type="text"
          className="py-2 px-3 text-gray-300 text-2xl outline-none bg-main md:block"
          placeholder="Search"
        />
        <div
          onClick={() => search()}
          data-tip
          data-for="search"
          className="flex items-center justify-center md:bg-ele cursor-pointer hover:text-white "
        >
          <IcomoonReact
            iconSet={iconSet}
            size="30"
            icon="search"
            color="#aaaaaa"
          />
        </div>
        <ReactTooltip id="search" type="light" effect="solid">
          <span className="text-lg">Search</span>
        </ReactTooltip>
      </div>
      {/* mobile search */}
      <div className="md:hidden">
        <div
          className={
            "w-auto rounded overflow-hidden " + (isSearch ? "flex" : "hidden")
          }
        >
          <input
            ref={mSearchRef}
            type="text"
            className="w-2/3 py-2 px-3 text-gray-300 text-xl outline-none bg-main"
            placeholder="Search"
          />
          <div
            onClick={() => mSearch()}
            data-tip
            data-for="search"
            className="rounded-tr rounded-br px-1 bg-ele w-auto flex items-center justify-center cursor-pointer hover:text-white"
          >
            <IcomoonReact
              iconSet={iconSet}
              size="30"
              icon="search"
              color="#aaaaaa"
            />
          </div>
        </div>
        <div
          onClick={() => setIsSearch(true)}
          data-tip
          data-for="search"
          className={
            "items-center justify-center md:bg-ele cursor-pointer hover:text-white " +
            (isSearch ? "hidden" : "flex")
          }
        >
          <IcomoonReact
            iconSet={iconSet}
            size="20"
            icon="search"
            color="#ffffff"
          />
        </div>
      </div>
      <div className="flex items-center">
        {/* upload */}
        <ReactTooltip id="upload" type="light" effect="solid">
          <span className="text-lg">Upload videos</span>
        </ReactTooltip>
        <div
          onClick={() => redirentTo("/upload/uploadvideo")}
          data-tip
          data-for="upload"
          className={
            "flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 cursor-pointer rounded-full ripple md:flex " +
            (isSearch ? "hidden" : "flex")
          }
        >
          <IcomoonReact
            iconSet={iconSet}
            color="#fff"
            size="30"
            icon="video-camera"
          />
        </div>
        <ReactTooltip id="notification" type="light" effect="solid">
          <span className="text-lg">Notifications</span>
        </ReactTooltip>
        {/* notifications */}
        <div
          onClick={() => openSnackbar("I will add this feature in future...")}
          data-tip
          data-for="notification"
          className="w-16 h-16 items-center justify-center cursor-pointer hidden ripple rounded-full md:flex"
        >
          <IcomoonReact iconSet={iconSet} color="#fff" size="30" icon="bell" />
        </div>
        {/* avatar */}
        <div
          onClick={changeInfo}
          className={
            "static md:relative mx-3 rounded-full w-12 cursor-pointer md:block " +
            (isSearch ? " hidden" : "block")
          }
        >
          <div
            className={
              "absolute flex flex-col w-full right-0 md:w-96 h-auto bg-main  md:right-16 z-60 top-0 " +
              (isInfo ? "flex" : "hidden")
            }
          >
            {user ? (
              <div>
                <div className="p-5 flex items-center border-b-2 border-b-light-ele">
                  <div className="w-20 ">
                    <div onClick={() => setIsSearch(false)}>
                      <IcomoonReact
                        iconSet={iconSet}
                        color="#fff"
                        size="20"
                        icon="cross"
                        className={
                          "absolute right-10 top-10 md:right-5 " +
                          (isSearch ? "block" : "hidden")
                        }
                      />
                    </div>
                    <img
                      src={user.photoURL}
                      alt=""
                      className="circular w-auto"
                    />
                  </div>
                  <h3 className=" ml-3 font-bold text-white text-3xl">
                    {user.displayName}
                  </h3>
                </div>
                <div className="flex flex-col text-white ">
                  <div
                    onClick={() => redirentTo(`/channel/${user.uid}`)}
                    className="relative p-5 flex items-center hover:bg-hover-ele"
                  >
                    <IcomoonReact
                      iconSet={iconSet}
                      color="#fff"
                      size="30"
                      icon="user"
                    />

                    <span className="ml-5 font-medium text-xl">
                      Your channel
                    </span>
                  </div>
                  <div
                    onClick={() => {
                      firebase.auth().signOut();
                      window.location.replace("/");
                    }}
                    className="p-5 flex items-center hover:bg-hover-ele"
                  >
                    <IcomoonReact
                      iconSet={iconSet}
                      color="#fff"
                      size="30"
                      icon="enter"
                    />
                    <span className="ml-5 font-medium text-xl">Sign out</span>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="p-5 flex justify-between items-center">
                  <Link href="/auth/authPage">
                    <span className="text-light-ele underline text-lg md:text-2xl">
                      You havent sign in. Sign in here.
                    </span>
                  </Link>
                  <span
                    onClick={() => {
                      changeInfo();
                    }}
                    className="mr-5"
                  >
                    <IcomoonReact
                      iconSet={iconSet}
                      color="#fff"
                      size="20"
                      icon="cross"
                    />
                  </span>
                </div>
              </div>
            )}
          </div>
          <img
            src={
              user
                ? user.photoURL
                : "https://images.assetsdelivery.com/compings_v2/triken/triken1608/triken160800029.jpg"
            }
            alt=""
            className="w-full circular"
          />
        </div>
      </div>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        size={400}
        duration={250}
        style={{ backgroundColor: "#212121" }}
      >
        <div className="py-10 flex flex-col">
          <div className="flex px-10 items-center">
            {/* hamburger */}
            <div
              className="ripple w-12 h-12 flex items-center justify-center rounded-full mr-3 cursor-pointer"
              onClick={toggleDrawer}
            >
              <IcomoonReact
                iconSet={iconSet}
                color="#fff"
                size="30"
                icon="menu"
              />
            </div>
            <h1 className="md-1 md:ml-3 font-roboto font-bold text-white text-xl md:text-2xl lg:text-3xl">
              <Link href="/">YouTubeClone</Link>
            </h1>
          </div>
          <div className="mt-10 flex flex-col">
            <div
              onClick={() => redirentTo("/")}
              className="flex items-center px-10 py-5 hover:bg-hover-ele cursor-pointer"
            >
              <IcomoonReact
                iconSet={iconSet}
                color="#fff"
                size="40"
                icon="home3"
              />
              <span className="font-medium text-white ml-5 text-2xl">Home</span>
            </div>
            <div
              onClick={() => {
                openSnackbar("Sorry I didnt add that feature...");
                toggleDrawer();
              }}
              className="flex items-center px-10 py-5 hover:bg-hover-ele cursor-pointer"
            >
              <IcomoonReact
                iconSet={iconSet}
                color="#fff"
                size="40"
                icon="safari"
              />
              <span className="font-medium text-white ml-5 text-2xl">
                Explore
              </span>
            </div>
            <div
              onClick={() => {
                if (user) {
                  redirentTo(`/history/${user.uid}`);
                } else {
                  redirentTo(`/history/noSignIn`);
                }
              }}
              className="flex items-center px-10 py-5 hover:bg-hover-ele cursor-pointer"
            >
              <IcomoonReact
                iconSet={iconSet}
                color="#fff"
                size="40"
                icon="history"
              />
              <span className="font-medium text-white ml-5 text-2xl">
                History
              </span>
            </div>

            <div
              onClick={() =>
                redirentTo(`/channel/` + (user ? user.uid : "noSignIn"))
              }
              className="flex items-center px-10 py-5 hover:bg-hover-ele cursor-pointer"
            >
              <IcomoonReact
                iconSet={iconSet}
                color="#fff"
                size="40"
                icon="video_library"
              />
              <span className="font-medium text-white ml-5 text-2xl">
                Your videos
              </span>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
