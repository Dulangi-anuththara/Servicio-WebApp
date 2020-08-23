const express = require('express');
const ongoing = express.Router();
const db = require('../database/database');
const { QuerySnapshot } = require('@google-cloud/firestore');

ongoing.get('/list/:ServiceId',(req,res)=>{
    console.log("here");
    var serviceId = req.params.ServiceId
    var data = []
    db.collection('Services').doc(serviceId).collection('ongoing').get()
    .then(querySnapshot=>{
        querySnapshot.forEach(doc =>{
                let process =doc.data();
                process.id = doc.id
                data.push(process);
        })

        res.send(data);
    })

})

ongoing.get('/doc/:id/:processId',(req,res)=>{
    var Id = req.params.id
    var process = req.params.processId

    db.collection('Services').doc(Id).collection('ongoing').doc(process).get()
    .then(documentSnapshot=>{
        var data = documentSnapshot.data();
        data.id = documentSnapshot.id

        res.send(data);
    })

})


ongoing.post('/add/:ServiceId/:bookingId',(req,res)=>{

    var ServiceId = req.params.ServiceId;
    var bookingId = req.params.bookingId;
    var data = {}

  db.collection('Services').doc(ServiceId).collection('Bookings').doc(bookingId).get()
  .then(documentSnapshot =>{
      data = documentSnapshot.data()
      data.id  = documentSnapshot.id;           
      
  })
  .then(() =>{      
     db.collection('Customers').doc(data.CustId).get()
     .then(documentSnapshot=>{
        data.custDetails=documentSnapshot.data()        
    })
    .then(()=>{
        db.collection('Customers').doc(data.CustId).collection('Vehicles').doc(data.Vehicle).get()
        .then(documentSnapshot=>{
            data.VehicleDetails=documentSnapshot.data()
        })
        .then(()=>{
            db.collection('Services').doc(ServiceId).collection('ongoing').doc(bookingId).set(data)
            .then(response=>{
                res.send(response);
            })
            
        })
    })    
     
 })
  .catch(err=>{
      console.log(err);
  })
})

ongoing.post('/stateUpdate/:ServiceId/:bookingId',(req,res)=>{
    var ServiceId = req.params.ServiceId;
    var bookingId = req.params.bookingId;
   console.log(req.body.status)
})

module.exports = ongoing;