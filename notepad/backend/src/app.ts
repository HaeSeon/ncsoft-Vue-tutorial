import { db } from './db';
import { ObjectID } from 'mongodb'

// express module
import express from 'express'
import jwt from 'jsonwebtoken'
const app = express();
const port = 3001;

// const userCollection = db.collection("user")

app.get("/", function (req, res) {
  console.log(`get ogu`)
  db.userCollection().findOne({ id: "ogu" }).then((user) => {
    console.log(user)
    res.send(user)
  })
})


app.listen(port, () => {
  console.log(`서버가 ${port}에서 동작중입니다.`);
});


// cors setting
import cors from "cors"
import { json } from 'body-parser'
import { User } from './User';
import { Post } from './Post'

app.use(cors());
app.use(json())


import { hash, verify } from 'argon2'
const salt = Buffer.from('tempsaltforhashpassword', 'utf8');

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
  const password = await hash(req.body.password, {
    salt
  })
  console.log(id, password)
  const user = await db.userCollection().findOne({ id: id, password: password });
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

  const user = await db.userCollection().findOne({ id: id })
  if (user) {
    console.log(`user exist ${user.id}`)
    res.status(403).send("user already exist")
    return
  } else {
    const hashPassword = await hash(password, { salt })
    const newUser: User = {
      id: id,
      password: hashPassword
    }
    const result = await db.userCollection().insertOne(newUser)
    if (result.result.ok) {
      console.log(`signup passed`)
      const token = jwt.sign({ id }, 'jinnyyy')
      res.send({
        ok: true,
        token
      })
    } else {
      res.status(403).send
    }



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

// 노트 하나 가져오기
app.get("/posts/:postId", async (req, res) => {
  const postId = req.params.postId
  console.log(`get post / post_id : ${postId}`)
  // const post = (await db.postCollection().find().toArray()).find(post =>
  //   (post as any)._id == postId
  // )
  const post = await db.postCollection().({ _id: new ObjectID(postId) })
  console.log(post)
  if (post) {
    res.send(post)
  } else {
    console.log(`post not exist with id ${postId} `)
    res.status(403).send('err')
  }
})




// 노트 생성
app.post("/posts", async (req, res) => {
  console.log(`create post `)
  const ownerId = req.body.ownerId
  const content = req.body.content
  const createDatetime = new Date().getTime()
  const newPost: Post =
  {
    owner_id: ownerId,
    content: content,
    create_datetime: createDatetime
  }

  const result = await db.postCollection().insertOne(newPost)
  if (result.result.ok) {
    res.send({
      ok: true
    })
  } else {
    res.send({ ok: false })
  }
})

// 노트 전체 가져오기 -> todo 페이징
app.get("/posts", async (req, res) => {
  const token = req.headers.token as string
  const userId = getUserIdFromToken(token)
  const posts = await db.postCollection().find({ owner_id: userId }).toArray()
  // console.log(posts)
  if (posts) {
    res.send({ posts })
  }
})

app.delete("/posts/:postId", async (req, res) => {
  const postId = req.params.postId
  const post = await db.postCollection().deleteOne({ _id: postId });
  if (post) {
    console.log(`post deleted`)
    res.send({ ok: true })
  }
})

app.put("/posts/:postId", (req, res) => {
  console.log(`update post `)
  const postId = req.params.postId
  const post = req.body
  const createDatetime = new Date().getTime()
  post.createDatetime = createDatetime
  db.postCollection().updateOne({ _id: postId }, post, (err, res) => {
    console.log(err, res)
  })
  res.send({ ok: true })
})
