const express = require("express")
const app = express();
const port = 3000;
const cors = require('cors');
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/notepad_db")
const db = mongoose.connection
// cors 설정
app.use(cors());

db.on('error', console.error.bind(console, `connection error : `))
db.once('open', () => {
  console.log(`mongoose connected`)
})


app.listen(port, () => {
  console.log(`서버가 ${port}에서 동작중입니다.`);
});

const UserSchema = new mongoose.Schema({
  id: String,
  password: String,
});

const User = mongoose.model("User", UserSchema);


const dogy = new User({
  id: "ogu",
  password: "1234"
})


app.get('/users', (req, res) => {
  User.find().then(users => {
    console.log(users)
    res.send({ users })
  })
})

// dogy.save().then(() => {
//   console.log(dogy);
// }).catch((err) => {
//   console.log(`Error:${err}`)
// })

