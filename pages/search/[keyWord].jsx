import Search from "../../components/Search/Search";
import Head from "next/head";
export default function SearchPage(props) {
  return (
    <div>
      <Head>
        <title>{props.keyword} - YouTubeClone</title>
      </Head>
      <Search keyword={props.keyword} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const keyword = context.params.keyWord.toLowerCase();
  return {
    props: {
      keyword,
    },
  };
}
