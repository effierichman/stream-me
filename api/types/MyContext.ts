// Before getting started with the resolvers, we will declare a new type: MyContext, which will be used to infer the current user's session.

import { Request, Response } from 'express'

export interface MyContext {
  req: Request
  res: Response
}

// We will begin to modify MyContext with each session's userId, once we create the authentication resolver.

// In order to help create the authentication resolver, we will create a middleware that handles checking for the current user's userId.
