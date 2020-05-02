import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
	apiKey: "AIzaSyBPv4m53bvA-xdzn_Whf1oCMoSFWgLsK3k",
	authDomain: "e-commerce-db-355bb.firebaseapp.com",
	databaseURL: "https://e-commerce-db-355bb.firebaseio.com",
	projectId: "e-commerce-db-355bb",
	storageBucket: "e-commerce-db-355bb.appspot.com",
	messagingSenderId: "989641903243",
	appId: "1:989641903243:web:7c17b27f3e2695c2a2588e",
	measurementId: "G-JWK80TCVMG"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;