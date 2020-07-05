const express = require('express');
const booking = express.Router();
const db = require('../database/database');
const TimestampDate = require("timestamp-date");


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

booking.post('/checkAvailability',(req,res) =>{

  var events =[];
  var start =req.body.start;
  var end = req.body.end;
 db.collection("Events").get()
    .then((querySnapshot)=>{
            let count = 0;
            querySnapshot.forEach((doc) =>{
              if(doc.data().start <= end && doc.data().end >= start){
                count++;
            }
            })
            return count;
    }).then((input)=>{
      res.send({events:input});
    })
    .catch(err =>{
      console.log(err);
    })
})


module.exports = booking;