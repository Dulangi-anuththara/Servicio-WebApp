var admin = require('firebase-admin');

var serviceAccount = require('./servicio-11f11-firebase-adminsdk-x1g3d-ecf7107bc3.json');

if(!admin.apps.length){
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://Servicio.firebaseio.com",
    
  })
}


const db = admin.firestore();

export default db;