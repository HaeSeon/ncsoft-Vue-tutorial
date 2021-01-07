import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import { db } from '../db'
import { User } from '../model/User';
import { hash, verify } from 'argon2'

//get userId
export const getUserIdFromToken = (token: string): string => {
  const data = jwt.verify(token, "jinnyyy") as any
  return data.id
}

//login
export const doLoginHandler: RequestHandler = async (req, res) => {
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
}

//signUp
export const doSignUpHandler: RequestHandler = async (req, res) => {
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
}

export const verifyUserHandler: RequestHandler = (req, res) => {
  const token = req.headers.token as string
  const userId = getUserIdFromToken(token)
  console.log(`user verified ${userId}`)
  res.send({
    id: userId
  })
}