// express module
import express from 'express'
import jwt from 'jsonwebtoken'
const app = express();
const port = 3001;

app.listen(port, () => {
  console.log(`서버가 ${port}에서 동작중입니다.`);
});

// cors setting
import cors from "cors"
import bodyParser from 'body-parser'
import { Post, User } from './db';

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


app.post("/auth/login", async function login(req, res) {
  const id = req.body.id
  const password = req.body.password
  console.log(req.body)
  const doc = await User.findOne({ id: id, password: password }).exec();
  console.log(doc);
  const token = jwt.sign({ id: id }, 'jinnyyy')
  console.log(token)
  if (doc) {
    res.send({
      ok: true,
      token: token
    });
  } else {
    res.send({
      ok: false,
    })
  }
})

app.post("/auth/signup")


// 노트 하나를 가져와
app.get("/notes/:noteId")


// 노트 생성
app.post("/notes", (req, res) => {
  const ownerId = req.body.owner_id
  const content = req.body.content
  const createDatetime = req.body.create_datetime
  const post = new Post(
    {
      owner_id: ownerId,
      content: content,
      create_datetime: createDatetime
    }
  )
  post.save()
  console.log("helell")
})

// 노트 전체 가져오눈거
app.get("/notes", (req, res) => {
  Post.find().then((posts: any) => {
    console.log(posts)
    res.send({ posts })
  })
})



// PUT : "/users/ogu"