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
import { json } from 'body-parser'
import { Post, User } from './db';

app.use(cors());
app.use(json())


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
import { hash, verify } from 'argon2'
const salt = Buffer.from('tempsaltforhashpassword', 'utf8');


app.post("/auth/login", async function login(req, res) {
  const id = req.body.id
  const password = await hash(req.body.password, {
    salt
  })
  console.log(id, password)

  const user = await User.findOne({ id: id, password: password }).exec();
  console.log(user)
  if (user) {
    const token = jwt.sign({ id }, 'jinnyyy')
    console.log(token)
    console.log(`login passed`)
    res.send({
      ok: true,
      token: token
    });
  } else {
    console.log(`login failed`)
    res.send({
      ok: false,
    })
  }
})

app.post("/auth/signup", async (req, res) => {
  console.log(`do sign up`)
  const id = req.body.id
  const password = req.body.password
  console.log(req.body)

  const user = await User.findOne({ id: id }).exec()
  if (user) {
    console.log(`user exist ${user.id}`)
    res.status(403).send("user already exist")
    return
  } else {
    const hashPassword = await hash(password, { salt })
    const newUser = new User(
      {
        id,
        password: hashPassword,
      }
    )
    newUser.save().then(() => {
      console.log(`signup passed`)
      const token = jwt.sign({ id }, 'jinnyyy')
      res.send({
        ok: true,
        token
      })
    })
  }



})

app.get("/auth/user", (req, res) => {
  const token = req.headers.token as string
  const userId = getUserIdFromToken(token)
  console.log(`user verified ${userId}`)
  res.send({
    id: userId
  })
})

function getUserIdFromToken(token: string): string {
  const data = jwt.verify(token, "jinnyyy") as any
  return data.id
}
// 노트 하나를 가져와
app.get("/notes/:noteId", async (req, res) => {
  const noteId = req.params.noteId
  console.log(`get note / note_id : ${noteId}`)
  const doc = await Post.findById(noteId).exec();
  if (doc) {
    res.send(doc)
  } else {
    console.log(`note not exist with id ${noteId}`)
    res.status(403).send('err')
  }
})


// 노트 생성
app.post("/notes", (req, res) => {
  console.log(`create note `)
  const ownerId = req.body.ownerId
  const content = req.body.content
  const createDatetime = new Date().getTime()
  const post = new Post(
    {
      owner_id: ownerId,
      content: content,
      create_datetime: createDatetime
    }
  )
  post.save().then(() => {
    res.send({
      ok: true
    });
  }).catch((err) => {
    res.send({
      ok: false
    })
    console.log(`Error:${err}`)
  })
  console.log("helell")
})

// 노트 전체 가져오눈거
app.get("/notes", (req, res) => {
  const token = req.headers.token as string
  const userId = getUserIdFromToken(token)
  Post.find({ owner_id: userId }).then((posts: any) => {
    console.log(`get ${posts.length} of post`)
    res.send({ posts })
  })
})

app.delete("/notes/:noteId", async (req, res) => {
  const noteId = req.params.noteId
  await Post.deleteOne({ _id: noteId });
  console.log(`note deleted`)
  res.send({ ok: true })
})

app.put("/notes/:noteId", async (req, res) => {
  console.log(`update note `)
  const noteId = req.params.noteId
  const note = req.body
  const createDatetime = new Date().getTime()
  note.createDatetime = createDatetime
  await Post.updateOne({ _id: noteId }, note, undefined, (err, res) => {
    console.log(err, res)
  })
  res.send({ ok: true })
})


// PUT : "/users/ogu"