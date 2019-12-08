import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyABBcHHOA0pzIDkSQoTrk7wrDyaabmURBw",
  authDomain: "crown-db-2b2dd.firebaseapp.com",
  databaseURL: "https://crown-db-2b2dd.firebaseio.com",
  projectId: "crown-db-2b2dd",
  storageBucket: "crown-db-2b2dd.appspot.com",
  messagingSenderId: "854735887151",
  appId: "1:854735887151:web:39e995f60bf67889f15fda",
  measurementId: "G-PF79DQBCRM"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (err) {
      console.log("Error creating user: ", err.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
