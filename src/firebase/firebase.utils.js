import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCxVTGp5egILObJAtke60ifbKq7XZKfNx4",
    authDomain: "e-commerce-db-87bb1.firebaseapp.com",
    databaseURL: "https://e-commerce-db-87bb1.firebaseio.com",
    projectId: "e-commerce-db-87bb1",
    storageBucket: "e-commerce-db-87bb1.appspot.com",
    messagingSenderId: "805392872355",
    appId: "1:805392872355:web:f764b06fd1229abf5d6016",
    measurementId: "G-GDQC1H550M"
  };

firebase.initializeApp(config);

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
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
