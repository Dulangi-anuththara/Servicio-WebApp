const express = require('express');
const admin = express.Router();
const db = require('../database/database');

admin.get('/profile',(req,res) =>{
    
    const profile = db.collection('users');
    let getDoc = profile.doc('1').get()
                 .then( doc => {
                     if(!doc.exists){
                         console.log('No such Document');
                     } else {
                         console.log('Document Data :',doc.data());
                         res.send(doc.data());
                     }
                 })
 });


 admin.get('/countTotalSerType',(req,res)=>{
     console.log('received')
    let serTypeCount = [0,0];

    db.collection("users").get()
  
    // .then.find({"user_type" : 'garage'})
      .then(response=>{
        for (let i=0; i<response.length; i++){
            switch(response[i].user_type){
              case("service"):
                serTypeCount[0]++;
                break;
  
              case("garage"):
                serTypeCount[1]++;
                break;
  
            }
      }
  
      console.log("ser type",serTypeCount);
  
      res.status(200).send({
       serTypeCount: serTypeCount
      })
    })
  })
  
  
 
  

 module.exports = admin;