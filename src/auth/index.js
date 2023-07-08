import { initializeApp } from 'firebase/app'
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth'
import { firebaseConfig } from './config.js'
import { readable } from 'svelte/store'
import { CREATE_USER_COLLECTION } from '../services/firebase.js'
import { collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const userMapper = claims => ({
  id: claims.user_id,
  name: claims.email,
  email: claims.email,
  picture: claims.picture
})

export async function addUser() {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      first: "Alan",
      middle: "Mathison",
      last: "Turing",
      born: 1912
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}


export const initAuth = () => {
  const auth = getAuth(app);

  const logout = () => {
    signOut(auth)
  }

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    // if (userRedirect) {
    //   return signInWithRedirect(provider)
    // } else {
    return signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...

      }).catch((error) => {
        // Handle Errors here.
        console.log(error.code)
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
    // }
  }

  const currentUser = readable(null, set => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const token = user.getIdTokenResult()
        const uid = user.uid;
        CREATE_USER_COLLECTION(user.id)
        set(user)

        console.log(currentUser)
        return user
      } else {
        set(null)
        console.log(currentUser)
        console.log('no user')
        return 'null'
      }
    })
    return unsub
  })
  return {
    currentUser,
    loginWithGoogle,
    logout
  }
}