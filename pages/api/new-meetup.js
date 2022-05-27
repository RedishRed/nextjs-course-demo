// api/new-meetup
import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.body);
    const data = req.body;
    // mongo db setup
    const client = await MongoClient.connect(
      "mongodb://James:6NNdEnRm2seuhuNT@wti-shard-00-00.2ojiv.mongodb.net:27017,wti-shard-00-01.2ojiv.mongodb.net:27017,wti-shard-00-02.2ojiv.mongodb.net:27017/meetups?ssl=true&replicaSet=atlas-99u6sm-shard-0&authSource=admin&retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    // insert to db.
    const result = await meetupsCollection.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({ message: "Meetup Inserted!" });
  }
}

export default handler;
