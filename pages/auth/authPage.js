import Auth from "../../components/Auth/Auth";
import Head from "next/head";

export default function auth() {
  return (
    <div>
      <Head>
        <title> Sign In </title>{" "}
      </Head>{" "}
      <Auth />
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}
