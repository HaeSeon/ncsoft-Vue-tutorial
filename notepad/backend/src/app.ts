// express module
import express from 'express'
const app = express();
const port = 3001;

app.listen(port, () => {
  console.log(`서버가 ${port}에서 동작중입니다.`);
});

// cors setting
import cors from "cors"
import bodyParser from 'body-parser'
import { User } from './db';

app.use(cors());
app.use(bodyParser())


// // headers must include jwt
// app.use("/users", function (req, res, next) {
//   // 방화벽 설정
//   // !req.headers.include(jwt) => throw err
//   // req.headers.include(jwt) => next()
//   next()
// })

// HTTP METHOD
// REST API => only 명사
// GET, POST, PUT, DELETE

app.post("/auth/login", function login(req, res) {
  console.log(req.body)
  res.send(req.body)
})

app.post("/auth/signup")

app.get('/users', (req, res) => {
  User.find((err, users) => {
    res.send(users[0])
  })


})

// PUT : "/users/ogu"