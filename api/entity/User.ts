import { prop as Property, getModelForClass } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Field, ObjectType } from 'type-graphql'

@ObjectType({ description: 'User' })
export class User {
  @Field()
  readonly _id: ObjectId

  @Field()
  @Property({ required: true })
  email: string

  @Property({ required: true })
  password: string
}

export const UserModel = getModelForClass(User)

// Each user has two accessible fields: _id and email. Passwords are readonly for security purposes. We will demonstrate how to securely store passwords in an upcoming section.

//A Decorator is a special kind of declaration that can be attached to a class declaration, method, accessor, property, or parameter. Decorators use the form @expression, where expression must evaluate to a function that will be called at runtime with information about the decorated class.
