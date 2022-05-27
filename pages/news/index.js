// our-domain.com/news
import { Fragment } from "react";
import Link from "next/link";

function NewsPage() {
  return (
    <Fragment>
      <h1>The News Page</h1>
      <ul>
        <li>
          <Link href="news/next-js-is-a-great-framework">
            Next JS Is a great framework
          </Link>
        </li>
        <li>Something else</li>
      </ul>
    </Fragment>
  );
}

export default NewsPage;
