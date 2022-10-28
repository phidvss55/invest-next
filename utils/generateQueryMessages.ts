import { collection, DocumentData, getDocs, orderBy, query, QueryDocumentSnapshot, Timestamp, where } from "firebase/firestore"
import { db } from "../config/firebase"
import { IMessage } from "../types"

export const generateQueryGetMessages = (conversationId?: string) => {
  return query(
    collection(db, 'messages'),
    where('conversation_id', '==', conversationId),
    orderBy('sent_at', 'asc')
  )
}

export const transformMessage = (message: QueryDocumentSnapshot<DocumentData>) => (
  {
    id: message.id,
    ...message.data(),
    sent_at: message.data().sent_at ? convertFirestoreTimestampToString(message.data().sent_at as Timestamp) : null
  } as unknown as IMessage
)

export const convertFirestoreTimestampToString = (timestamp: Timestamp) => new Date(timestamp.toDate().getTime()).toLocaleString()