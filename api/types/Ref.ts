// Before going on to the Stream entity, let's define a Ref object type for our database. A Ref is considered to be a manual reference. A manual references is where you save the ObjectId field of one document in another document as a reference. Then your application can run a second query to return the related data. These references are simple and sufficient for most use cases.

import { ObjectId } from 'mongodb'

export type Ref<T> = T | ObjectId

//Using manual references is the practice of including one document's ObjectId field in another document. The application can then issue a second query to resolve the referenced fields as needed.

// For nearly every case where you want to store a relationship between two documents, use manual references. The references are simple to create and your application can resolve references as needed. However, if you need to reference documents from multiple collections, consider using DBRefs.
