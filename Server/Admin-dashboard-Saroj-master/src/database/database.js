import * as firebase from 'firebase';
import "firebase/auth";

const firebaseConfig = {
  apiKey: 'AIzaSyC1I4w3OUaDmITrLrA0TDfhicVwVWDnJrk',
  authDomain: 'servicio-11f11.firebaseapp.com',
  projectId: 'servicio-11f11'
}
const db = null;

if(!firebase.apps.length){

 db = firebase.initializeApp(firebaseConfig);
}

export default db;