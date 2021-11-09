// Streams are considered to be embedded posts. We reference the User entity with our Ref type, and assign them as the stream's author.

import { prop as Property, getModelForClass } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Field, ObjectType } from 'type-graphql'
import { User } from './User'
import { Ref } from '../types/Ref'

@ObjectType({ description: 'Stream embedded post content' })
export class Stream {
  @Field()
  readonly _id: ObjectId

  @Field()
  @Property({ required: true })
  title: string

  @Field()
  @Property({ required: true })
  description: string

  @Field()
  @Property({ required: true })
  url: string

  @Field(() => User)
  @Property({ Ref: User, required: true })
  author: Ref<User>
}

export const StreamModel = getModelForClass(Stream)
