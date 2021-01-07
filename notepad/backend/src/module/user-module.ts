import jwt from 'jsonwebtoken'


export const getUserIdFromToken = (token: string): string => {
  const data = jwt.verify(token, "jinnyyy") as any
  return data.id
}


