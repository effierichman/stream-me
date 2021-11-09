import { GraphQLSchema } from 'graphql'
import { buildSchema } from 'type-graphql'
import { ObjectId } from 'mongodb'
import path from 'path'

import { UserResolver } from '../resolvers/UserResolver'
import { AuthResolver } from '../resolvers/AuthResolver'
import { StreamResolver } from '../resolvers/StreamResolver'
import { ObjectIdScalar } from './object-id.scalar'
import { TypegooseMiddleware } from '../middleware/typegoose'

// build TypeGraphQL executable schema
export default async function createSchema(): Promise<GraphQLSchema> {
  const schema = await buildSchema({
    // 1. add all typescript resolvers
    resolvers: [UserResolver, AuthResolver, StreamResolver],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    // 2. use document converting middleware
    globalMiddlewares: [TypegooseMiddleware],
    // 3. use ObjectId scalar mapping
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
    validate: false,
  })
  return schema
}

// In the above code, we do the following:

// 1. Add all typescript resolvers into the schema from the ../resolvers directory.
// 2. Apply typegoose middleware to allow GraphQL work with MongoDB Documents.
// 3. Apply the scalars map to parse ObjectId properties into string values.
