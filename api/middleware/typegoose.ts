import { Model, Document } from 'mongoose'
import { getClassForDocument } from '@typegoose/typegoose'
import { MiddlewareFn } from 'type-graphql'

export const TypegooseMiddleware: MiddlewareFn = async (_, next) => {
  const result = await next()

  if (Array.isArray(result)) {
    return result.map((item) =>
      item instanceof Model ? convertDocument(item) : item
    )
  }

  if (result instanceof Model) {
    return convertDocument(result)
  }

  return result
}

function convertDocument(doc: Document) {
  const convertedDocument = doc.toObject()
  const DocumentClass = getClassForDocument(doc)!
  Object.setPrototypeOf(convertDocument, DocumentClass.prototype)
  return convertedDocument
}

// In the above code, we convert MongoDB Documents into readable objects. Without this middleware, our Ref types would not be able to reference other database objects.
