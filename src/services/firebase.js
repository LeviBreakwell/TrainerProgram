import firebase from 'firebase/compat/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/database'

let _DATABASE_NAME = 'exercises'
let COLLECTION_USERS = 'USERS'

export function CREATE_USER_COLLECTION(user_id) {
  return new Promise((resolve, reject) => {
    let userRef = firebase.firestore().collection(COLLECTION_USERS).doc(userID)

    userRef.get().then((userDoc) => {
      if (!userDoc.exists) {
        userRef.set({
          favorites: []
        })
      }
      resolve()
    })
      .catch((error) => {
        reject(error)
      })
  })
}