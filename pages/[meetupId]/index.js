import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";

function MeetupDetails(props) {
  return (
    <MeetupDetail  
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
}

// required to be include if your page is dynamic ex [meetupId]
// and has the getStaticProps on it.
export async function getStaticPaths() {
  // establish connection to mongodb.
  // mongo db setup
  const client = await MongoClient.connect(
    "mongodb://James:6NNdEnRm2seuhuNT@wti-shard-00-00.2ojiv.mongodb.net:27017,wti-shard-00-01.2ojiv.mongodb.net:27017,wti-shard-00-02.2ojiv.mongodb.net:27017/meetups?ssl=true&replicaSet=atlas-99u6sm-shard-0&authSource=admin&retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb://James:6NNdEnRm2seuhuNT@wti-shard-00-00.2ojiv.mongodb.net:27017,wti-shard-00-01.2ojiv.mongodb.net:27017,wti-shard-00-02.2ojiv.mongodb.net:27017/meetups?ssl=true&replicaSet=atlas-99u6sm-shard-0&authSource=admin&retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });
  client.close();
  
  return {
    props: {
      meetupData: {
        image: selectedMeetup.image,
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        description: selectedMeetup.description,        
      },
    },
  };
}

export default MeetupDetails;
