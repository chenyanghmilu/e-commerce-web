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

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = (firestore.doc(`user/${userAuth.uid}`));
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
			})

		} catch (error) {
			console.log('error creating user', error.message);
		}
	}
	return userRef;
}

firebase.initializeApp(config);

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
	const collectionRef = firestore.collection(collectionKey);
	const batch = firestore.batch();

	objectsToAdd.forEach(obj => {
		const newDocRef = collectionRef.doc();
		batch.set(newDocRef, obj);
	})

	return await batch.commit()
}

export const converCollectionsSnapshotToMap = (collections) => {
	const transformedCollection = collections.docs.map(doc => {
		const { title, items } = doc.data();

		return {
			routeName: encodeURI(title.toLowerCase()),
			id: doc.id,
			title,
			items
		}
	})
	return transformedCollection.reduce((accumulator, collection) => {
		accumulator[collection.title.toLowerCase()] = collection
		return accumulator
	}, {})
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;