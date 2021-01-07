// express module
import express from 'express'
export const app = express();
// cors setting
import cors from "cors"
import { json } from 'body-parser'

import { User } from './model/User';
import { hash, verify } from 'argon2'
import jwt from 'jsonwebtoken'
import { db } from './db';
import { ObjectID } from 'mongodb'
import { Post } from './model/Post';
import { getUserIdFromToken } from './module/user-module'

const port = 3001;
app.listen(port, () => {
  console.log(`서버가 ${port}에서 동작중입니다.`);
});

app.use(cors());
app.use(json())

app.post("/auth/login", async (req, res) => {
  const id = req.body.id
  const password = req.body.password;

  const user = await db.userCollection().findOne({ id: id });
  if (!user) {
    throw `user not exist with id ${id}`
  }

  const isVerified = (hashed: string, target: string) => {
    return verify(hashed, target)
  }

  if (!isVerified(user.password, password)) {
    throw `password invalid`
  }

  console.log(id, password)
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
  const id = req.body.id
  const password = req.body.password
  const user = await db.userCollection().findOne({ id: id })
  if (user) {
    console.log(`user exist ${user.id}`)
    res.status(403).send("user already exist")
    return
  } else {
    const hashPassword = await hash(password)

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


// get a post
app.get("/posts/:postId", async (req, res) => {
  const postId = req.params.postId
  console.log(`get post / post_id : ${postId}`)
  const post = await db.postCollection().findOne({ _id: new ObjectID(postId) })
  if (post) {
    res.send(post)
  } else {
    console.log(`post not exist with id ${postId} `)
    res.status(403).send('err')
  }
})

// create a post
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


// get all posts
// /posts?start=13
app.get("/posts", async (req, res) => {
  const startAt = parseInt(req.query.start as string, 10)
  const batch = 10
  const token = req.headers.token as string
  const userId = getUserIdFromToken(token)
  console.log(`get posts from ${userId} start at ${startAt}`)
  const posts = await db.postCollection().find({ owner_id: userId }).skip(startAt || 0).limit(batch).toArray()
  if (posts) {
    res.send({ posts })
  }
})

// delete a post
app.delete("/posts/:postId", async (req, res) => {
  const postId = req.params.postId
  console.log(`delete post / postid : ${postId}`)
  const post = await db.postCollection().deleteOne({ _id: new ObjectID(postId) });
  if (post) {
    console.log(`post deleted`)
    res.send({ ok: true })
  } else {
    console.log(`post not exist`)
    res.status(403).send(`cannot delete post not exist`)
  }
})

// update a post
app.put("/posts/:postId", (req, res) => {
  const postId = req.params.postId
  const post = req.body
  const createDatetime = new Date().getTime()
  post.createDatetime = createDatetime
  db.postCollection().updateOne({ _id: new ObjectID(postId) }, { $set: post })
  console.log(`update post`)
  res.send({ ok: true })
})