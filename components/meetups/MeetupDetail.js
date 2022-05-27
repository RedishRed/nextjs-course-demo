import classes from "./MeetupDetail.module.css";
import Image from "next/image";
import { Fragment } from "react";
import Head from "next/head";

function MeetupDetail(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.title}</title>
        <meta
          name="description"
          content="Browse a huge list of highly active react meetups!"
        />
      </Head>
      <section className={classes.detail}>
        <Image
          src={props.image}
          alt={props.title}
          layout="responsive"
          width="100%"
          height="100%"
        />
        <h1>{props.title}</h1>
        <address>{props.address}</address>
        <p>{props.description}</p>
      </section>
    </Fragment>
  );
}

export default MeetupDetail;
