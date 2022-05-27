// our-domain/
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";
import { Fragment } from "react";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First Meetup",
//     image:
//       "https://images.unsplash.com/photo-1495562569060-2eec283d3391?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870",
//     address: "Some address 5, 12345 some city",
//     description: "This is a first meetup!",
//   },
//   {
//     id: "m2",
//     title: "A Second Meetup",
//     image:
//       "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=874",
//     address: "Some address 2, 53432 some city",
//     description: "This is a second meetup!",
//   },
// ];

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active react meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// this will not run in the build process it will run always on the server after deployment
// this is the difference between getStaticProps.
// fetch data from API
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  // fetch data from API
  // MongoClient.connect();
  // establish connection to mongodb.
  // mongo db setup
  const client = await MongoClient.connect(
    "mongodb://James:6NNdEnRm2seuhuNT@wti-shard-00-00.2ojiv.mongodb.net:27017,wti-shard-00-01.2ojiv.mongodb.net:27017,wti-shard-00-02.2ojiv.mongodb.net:27017/meetups?ssl=true&replicaSet=atlas-99u6sm-shard-0&authSource=admin&retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();
  client.close();

  // always return an object
  // renders first before the component above.
  fetch("/api/meetups");
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
    // number of seconds next js will wait until it regenerates this page for an incoming request.
    // 1 second until revalidate.
    // this depends on your data.
    revalidate: 60,
  };
}

// which one is good to be use getStaticProps or getServerSideProps
/*
  getServerSideProps
  - this is guaranteed to run on every request or req. 
  - downside is you need to wait for your page to be generated on every incoming req. 
  - if you have data that changes multiple times every second and revalidate. 

  getStaticProps
  - if you don't have data that changes all the time. 
  - pre generate an HTML file the file can be stored and serve by a CDN. 
  
*/
export default HomePage;
