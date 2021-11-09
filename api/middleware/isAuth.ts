// Let's declare our first middleware, isAuth (or "isAuthenticated") to make sure the current session contains a logged in user.

import { MiddlewareFn } from 'type-graphql'
import { MyContext } from '../types/MyContext'
import jwt from 'jsonwebtoken'

const APP_SECRET = process.env.SESSION_SECRET || 'aslkdfjoiq12312'

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const authorization = context.req.headers['authorization']
  try {
    const token = authorization?.replace('Bearer ', '')!
    const user = jwt.verify(token, APP_SECRET) as any
    context.res.locals.userId = user.id
    return next()
  } catch (err) {
    throw new Error(err.message)
  }
}

// In the above code, we throw an error if the current session contains no userId property. The isAuth middleware will be applied to a few resolvers, as we will see in a few moments.

// Similar to Express middleware, TypegraphQL allows us to write custom middlewares for each request. So we can add this custom logic before each incoming request.

// For more information on res.locals, visit the Express.js documentation.
