// Before moving on to the resolvers, we will define an ObjectId scalar for our schema. This scalar is specific to MongoDB, because an ObjectId has a unique format, e.g. ObjectId("adaj130jfsdm10").

import { GraphQLScalarType, Kind } from 'graphql'
import { ObjectId } from 'mongodb'

export const ObjectIdScalar = new GraphQLScalarType({
  name: 'ObjectId',
  description: 'Mongo object id scalar type',
  parseValue(value: string) {
    return new ObjectId(value) // client from input variable
  },
  serialize(value: ObjectId) {
    return value.toHexString() // value sent to the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new ObjectId(ast.value)
    }
    return null
  },
})

// The GraphQLScalarType code handles parsing objects as strings, and serializing them as hex strings. This is useful for converting ObjectId properties into string values.

// In summary ObjectID("adaj130jfsdm10") becomes a text string: adaj130jfsdm10, and vice versa.
