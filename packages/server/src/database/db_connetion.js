import {MongoClient} from 'mongodb';
import dotenv from "dotenv";
dotenv.config();

const URI = process.env.URI || "mongodb://localhost:27017/";
async function dbConnect() {
    const client = new MongoClient(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  
    try {
      const conn = await client.connect();
      console.log("Connected correctly to server");
      return conn;
    } catch (err) {
      console.log(err.stack);
    }
  }
  const conn = await dbConnect();
  const database = conn.db("restaurant");
  export { dbConnect, database };
