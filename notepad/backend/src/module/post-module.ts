import { RequestHandler } from "express"
import { db } from "../db"
import { Post } from "../model/Post"
import { getUserIdFromToken } from "./user-module"
import { ObjectID } from 'mongodb'

// get a post
export const getOnePostHandler: RequestHandler = async (req, res) => {
  const postId = req.params.postId
  console.log(`get post / post_id : ${postId}`)
  const post = await db.postCollection().findOne({ _id: new ObjectID(postId) })
  if (post) {
    res.send(post)
  } else {
    console.log(`post not exist with id ${postId} `)
    res.status(403).send('err')
  }
}

// create a post
export const createPostHandler: RequestHandler = async (req, res) => {
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
}

// get all posts
export const getAllPostsHandler: RequestHandler = async function (req, res) {
  const startAt = parseInt(req.query.start as string, 10)
  const batch = 10
  const token = req.headers.token as string
  const userId = getUserIdFromToken(token)
  console.log(`get posts from ${userId} start at ${startAt}`)
  const posts = await db.postCollection().find({ owner_id: userId }).skip(startAt || 0).limit(batch).toArray()
  if (posts) {
    res.send({ posts })
  }
}

// delete a post
export const deletePostHandler: RequestHandler = async (req, res) => {
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
}

// update a post
export const updatePostHandler: RequestHandler = (req, res) => {
  const postId = req.params.postId
  const post = req.body
  const createDatetime = new Date().getTime()
  post.createDatetime = createDatetime
  db.postCollection().updateOne({ _id: new ObjectID(postId) }, { $set: post })
  console.log(`update post`)
  res.send({ ok: true })
}