import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../../firebase/initFirebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import { saveUserData } from "../../firebase/firebaseMethods";
import Loading from "../Loading/Loading";
let countTime = 5;
const uiConfig = {
  signInFlow: "popup",
  // signInSuccessUrl: "/",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: async ({ user }, redirectUrl) => {
      saveUserData(user);
    },
  },
};
export default function Auth() {
  const [user, userLoading, userError] = useAuthState(firebase.auth());

  const count = () => {
    countTime--;
    if (countTime <= 0) {
      window.location.replace("/");
    }
  };
  {
    if (userLoading) {
      return <Loading />;
    } else {
      if (user) {
        setInterval(() => {
          count();
        }, 1000);
        return (
          <div className="h-screen w-screen flex flex-col items-center justify-center w-auto h-auto">
            <h3 className="font-bold text-light-ele text-xl md:text-3xl lg:text-5xl">
              You are logged in...
            </h3>

            <span className="mt-10 cursor-pointer text-2xl text-light-ele">
              Redirecting to home page...
            </span>
          </div>
        );
      } else {
        return (
          <div className="h-screen w-screen items-center flex justify-center w-auto h-auto">
            <div className="bg-main rounded-3xl p-10 mt-10">
              <h3 className="mb-10 flex justify-center items-center text-light-ele font-bold text-xl md:text-3xl lg:text-5xl">
                Sign in to YouTube Clone
              </h3>
              <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
              />
            </div>
          </div>
        );
      }
    }
  }
}
