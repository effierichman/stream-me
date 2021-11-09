import { Arg, Mutation, Resolver } from 'type-graphql'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import { UserModel } from '../entity/User'
import { AuthInput } from '../types/AuthInput'
import { UserResponse } from '../types/UserResponse'

@Resolver()
export class AuthResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg('input')
    { email, password }: AuthInput
  ): Promise<UserResponse> {
    // 1. Check for existing user email
    const existingUser = await UserModel.findOne({ email })

    if (existingUser) {
      throw new Error('Email already in use')
    }

    // 2. Create new user with hash password
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new UserModel({ email, password: hashedPassword })
    await user.save()

    // 3. store user id on the token payload
    const payload = {
      id: user.id,
    }

    const token = jwt.sign(
      payload,
      process.env.SESSION_SECRET || 'aslkdfjoiq12312'
    )
    return { user, token }
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('input') { email, password }: AuthInput
  ): Promise<UserResponse> {
    const existingUser = await UserModel.findOne({ email })
    if (!existingUser) {
      throw new Error('Invalid login')
    }
    // check
    const valid = await bcrypt.compare(password, existingUser.password)
    if (!valid) {
      throw new Error('Invalid login')
    }

    // Store user id on the token payload
    const payload = {
      id: existingUser.id,
    }

    const token = jwt.sign(
      payload,
      process.env.SESSION_SECRET || 'aslkdfjoiq12312'
    )
    return { user: existingUser, token }
  }
}

// The AuthResolver is primarily responsible for the following:

// 1. Given an email address, check if a user already exists
// 2. If not, create a new user with a hashed password value
// 3. Finally, assign and return the new user's JSON Web Token
