// mongodb module
import MongoDB from 'mongodb'
import assert from "assert"
import { User } from './User';
import { Post } from './Post';

const url = "mongodb://localhost:27017/notepad_db"



interface Schemas {
  "user": MongoDB.Collection<User>
  "post": MongoDB.Collection<Post>
}

interface DatabaseProps {
  getCollection<K extends keyof Schemas>(collection: K): Schemas[K]
}

class Database implements DatabaseProps {
  // lazy intialize??
  private dbNote: MongoDB.Db | undefined
  private client: MongoDB.MongoClient | undefined;

  constructor() {
    MongoDB.connect(url, { useUnifiedTopology: true }, (err, client) => {
      assert.equal(null, err);
      console.log("Connected correctly to mongodb server");
      this.client = client

      this.dbNote = client.db("notepad_db")
      // destuctor..??
      // client.close();
    });
  }

  getCollection<K extends keyof Schemas>(collectionName: K): Schemas[K] {
    if (!this.client) {
      throw 'db not initialized'
    }
    return this.client.db("notepad_db").collection(collectionName) as Schemas[K]
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

// testing code
// export const userCollection = db.getCollection("user")
// export const postCollection = db.getCollection("post")