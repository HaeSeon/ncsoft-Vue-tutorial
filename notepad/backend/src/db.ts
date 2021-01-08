// mongodb module
import MongoDB from 'mongodb'
import assert from "assert"
import { User } from './model/User';
import { Post } from './model/Post';

const url = "mongodb://localhost:27017/notepad_db"

class Database {
  private client: MongoDB.MongoClient | undefined;

  constructor() {
    MongoDB.connect(url, { useUnifiedTopology: true }, (err, client) => {
      assert.equal(null, err);
      console.log("Connected correctly to mongodb server");
      this.client = client
      // destuctor..??
      // client.close();
    });
  }

  userCollection(): MongoDB.Collection<User> {
    if (!this.client) {
      throw `db has not initialized`
    }
    return this.client.db("notepad_db").collection("users")
  }
  postCollection(): MongoDB.Collection<Post> {
    if (!this.client) {
      throw `db has not initialized`
    }
    return this.client.db("notepad_db").collection("posts")
  }
}

export const db = new Database()