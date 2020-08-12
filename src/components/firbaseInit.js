import firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig'
 // Initialize Firebase
 export default firebase.initializeApp(firebaseConfig).firestore()