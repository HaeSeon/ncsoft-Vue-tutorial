import express from 'express'
export const app = express();
import cors from "cors"
import { json } from 'body-parser'
import { doLoginHandler, doSignUpHandler, verifyUserHandler } from './module/user-module'
import { createPostHandler, deletePostHandler, getAllPostsHandler, getOnePostHandler, updatePostHandler } from './module/post-module'

app.use(cors());
app.use(json())

//about User
app.post("/auth/login", doLoginHandler)
app.post("/auth/signup", doSignUpHandler)
app.get("/auth/user", verifyUserHandler)

//about Post
app.get("/posts/:postId", getOnePostHandler)
app.post("/posts", createPostHandler)
app.get("/posts", getAllPostsHandler)
app.delete("/posts/:postId", deletePostHandler)
app.put("/posts/:postId", updatePostHandler)

//server
const port = 3001;
app.listen(port, () => {
  console.log(`서버가 ${port}에서 동작중입니다.`);
});