import "../styles/globals.css";
import { useEffect, useState } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import TopBarProgress from "react-topbar-progress-indicator";
import Router from "next/router";
TopBarProgress.config({
  barColors: {
    0: "red",
    "1.0": "red",
  },
  shadowBlur: 5,
});

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);
  const start = () => {
    setIsLoading(true);
  };
  const end = () => {
    setIsLoading(false);
  };
  useEffect(() => {
    window.document.querySelector("body").className +=
      " bg-main remove scrollbar scrollbar-thin scrollbar-thumb-light-ele scrollbar-track-main scrollbar-thumb-rounded-full";
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  return (
    <>
      {" "}
      {isLoading ? <TopBarProgress /> : null} <Component {...pageProps} />{" "}
    </>
  );
}

export default MyApp;
