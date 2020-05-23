var admin = require('firebase-admin');

var serviceAccount = require('./servicio-11f11-firebase-adminsdk-x1g3d-ecf7107bc3.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://Servicio.firebaseio.com"
  })

const db = admin.firestore();


function getDialogue(){
  
  return new Promise(function(resolve,reject){

    resolve({
      "uName":"Anuththara",
      "uid":"3"
    });
  })
}

getDialogue().then(result => {
  console.log(result);
  const obj = result;

  const userData ={
    uName:obj.uName,
    uid:obj.uid
  };

  return db.collection('users').doc('user3')
  .set(userData).then(() => console.log('new user written to database'));
});

module.exports = db ;

