import { useRouter } from "next/router";

// our-domain.com/news/something-important
// dynamic routing use [parameters] this is understood by next js.

function DetailPage() {
  const router = useRouter();
  const newsId = router.query.newsId;

  // send request to the backend API
  // to fetch the news item with newsId

  return <h1>Details Page</h1>;
}

export default DetailPage;
