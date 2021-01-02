// mongoose module
import mongoose, { Document, Mongoose } from 'mongoose'
mongoose.connect("mongodb://localhost:27017/notepad_db")	//db명
const db = mongoose.connection

// mongoose connection
db.on('error', console.error.bind(console, `connection error : `))
db.once('open', () => {
  console.log(`mongoose connected`)
})

// generate User schema 
const UserSchema = new mongoose.Schema({
  id: String,
  password: String,
});


interface UserModel extends Document {
  id: string,
  password: string
}

// Accessing a Model
export const User = mongoose.model<UserModel>("User", UserSchema);

interface PostModel extends Document {
  // todo : implement here
}
// generate Post data
const PostSchema = new mongoose.Schema<PostModel>({
  owner_id: String,
  content: String,
  create_datetime: Number,
  important: Boolean
});
export const Post = mongoose.model("Post", PostSchema)

// let today = new Date();
// const note = new Post({
//   owner_id: "5fed5d8dde9a450bf092be9e",
//   content: "ogu is qquackckckck",
//   create_datetime: today.getTime(),
//   important: false
// })

// save data into mongoDB
// note.save().then(() => {
//   console.log(note);
// }).catch((err) => {
//   console.log(`Error:${err}`)
// })