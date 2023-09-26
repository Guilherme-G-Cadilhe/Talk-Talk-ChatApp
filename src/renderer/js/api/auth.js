import db from '../db/firestore';
import firebase from 'firebase/app';
import 'firebase/auth';

const createUserProfile = (userProfile) => db
  .collection('profiles')
  .doc(userProfile.uid)
  .set(userProfile);

export const getUserProfile = (userUid) => db
  .collection('profiles')
  .doc(userUid)
  .get()
  .then((snapshot) => snapshot.data());



export async function register(email, password, username, avatar) {
  try {
    const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password)
    const userProfile = { uid: user.uid, username: username, email: email, avatar: avatar, joinedChats: [] }
    await createUserProfile(userProfile)
  } catch (error) {
    return Promise.reject(error)
  }
}
//https://www.pinclipart.com/picdir/middle/133-1331433_free-user-avatar-icons-happy-flat-design-png.png

export const login = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password)

export const logout = () => firebase.auth().signOut()

export const onAuthStateChanges = (onAuth) => firebase.auth().onAuthStateChanged(onAuth)
