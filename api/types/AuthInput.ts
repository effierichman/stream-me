import { InputType, Field } from 'type-graphql'

@InputType()
export class AuthInput {
  @Field()
  email: string

  @Field()
  password: string
}

// When writing GraphQL mutations, we should create an input type to handle sending the data values. In this case, new users are asked to enter their email and password.
