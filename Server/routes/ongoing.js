const express = require('express');
const ongoing = express.Router();
const db = require('../database/database');


ongoing.post('/add/:ServiceId/:bookingId',(req,res)=>{
    var ServiceId = req.params.ServiceId;
    var bookingId = req.params.bookingId;

  db.collection('Services').doc(ServiceId).collection('Bookings').doc(bookingId).get()
  .then(documentSnapshot =>{
      var data = documentSnapshot.data()
      data.id  = documentSnapshot.id;
      return data
  })
  .then(data =>{
      db.collection('Services').doc(ServiceId).collection('ongoing').doc(bookingId).set(data);
  })
  .then(response =>{
      res.send(response);
  })
})

module.exports = ongoing;