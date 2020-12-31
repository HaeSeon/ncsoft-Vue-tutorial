// express module
import express from 'express'
const app = express();
const port = 3001;

// cors setting
import cors from "cors"
app.use(cors());

// mongoose module
import mongoose from 'mongoose'
mongoose.connect("mongodb://localhost:27017/notepad_db")	//db명
const db = mongoose.connection

app.listen(port, () => {
  console.log(`서버가 ${port}에서 동작중입니다.`);
});

// mongoose connection
db.on('error', console.error.bind(console, `connection error : `))
db.once('open', () => {
  console.log(`mongoose connected`)
})

// generate schema 
const UserSchema = new mongoose.Schema({
  id: String,
  password: String,
});

// Accessing a Model
const User = mongoose.model("User", UserSchema);

// generate object
const dogy = new User({
  id: "ogu",
  password: "1234"
})

// save data into mongoDB
// dogy.save().then(() => {
//   console.log(dogy);
// }).catch((err) => {
//   console.log(`Error:${err}`)
// })

app.get('/users', (req, res) => {
  User.find().then(users => {
    console.log(users)
    res.send({ users })
  })
})