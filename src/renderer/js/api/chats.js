import db from "../db/firestore";
import firebase from 'firebase/app'

// fetching collection - data is under snapshot.docs
const extractSnapshotData = (snapshot) => snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

export const fetchChats = () =>
  db
    .collection('chats')
    .get()
    .then(extractSnapshotData);

export const createChats = chat =>
  db
    .collection('chats')
    .add(chat)
    .then(docRef => docRef.id);

export const joinChat = async (userId, chatId) => {
  const userRef = db.doc(`profiles/${userId}`);
  const chatRef = db.doc(`chats/${chatId}`);
  await userRef.update({ joinedChats: firebase.firestore.FieldValue.arrayUnion(chatRef) })
  await chatRef.update({ joinedUsers: firebase.firestore.FieldValue.arrayUnion(userRef) })
  return true
}

export const subscribeToChat = (chatId, onSubsribe) =>
  db
    .collection('chats')
    .doc(chatId)
    .onSnapshot(snapshot => onSubsribe({ id: snapshot.id, ...snapshot.data() }));

export const subscribeToProfile = (uid, onSubsribe) =>
  db
    .collection('profiles')
    .doc(uid)
    .onSnapshot(snapshot => onSubsribe(snapshot.data()));