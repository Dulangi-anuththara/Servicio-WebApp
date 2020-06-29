const express = require('express');
const booking = express.Router();
const db = require('../database/database');


booking.get('/',(req,res)=>{
    let data = [];
    let bookingref = db.collection('Bookings');
    let allbookings = bookingref.get()
  .then(snapshot => {
    snapshot.forEach(doc => {
        let booking = doc.data();
        booking.id = doc.id;
      data.push(booking);
      //console.log(doc.id, '=>', doc.data());
    });
    
    res.send(data);
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });
})


module.exports = booking;