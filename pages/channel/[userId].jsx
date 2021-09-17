import YourChannel from "../../components/YourChannel/YourChannel";
import firebase from "../../firebase/initFirebase";
import Head from "next/head";
export default function UserId({ id, data }) {
  // console.log(data);
  return (
    <div>
      <Head>
        <title>{data ? data.displayName : ""} - YouTubeClone</title>
      </Head>
      <YourChannel id={id} data={data} />
    </div>
  );
}
export async function getServerSideProps(context) {
  const id = context.params.userId;
  const userInfo = await firebase.firestore().collection("users").doc(id).get();
  console.log(id);
  if (id === "noSignIn") {
    return {
      props: {},
    };
  } else if (userInfo.exists) {
    return {
      props: {
        id: userInfo.id,
        data: userInfo.data(),
      },
    };
  } else if (!userInfo.exists && id !== "noSignIn") {
    context.res.statusCode = 302;
    context.res.setHeader("Location", `/404`); // Replace <link> with your url link
    context.res.end();
    return {
      props: {},
    };
  }
}
