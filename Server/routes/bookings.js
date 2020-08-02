const express = require('express');
const booking = express.Router();
const db = require('../database/database');
const TimestampDate = require("timestamp-date");


booking.get('/:id',(req,res)=>{
   const id = req.params.id
    let data = [];
    let bookingref = db.collection('Services').doc(id).collection('Bookings').where('BookingStatus','==','Pending');
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

booking.post('/checkAvailability/:id',(req,res) =>{

  const id= req.params.id
  var events =[];
  var start =req.body.start;
  var end = req.body.end;
 db.collection('Services').doc(id).collection("Events").get()
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

booking.post('/edit/:key',(req,res) =>{

    var key = req.params.key
    var id = req.body.bookingId;
    var CustId = req.body.CustId;
    console.log(id);
    res.send("Received Id")

  db.collection('Services').doc(key).collection("Bookings").doc(id).update({
    BookingStatus:'Accepted'
  }).then(function() {
    console.log("Document successfully deleted!");

    db.collection('users').doc(CustId).collection('Bookings').doc(id).update({
      BookingStatus:'Accepted'
    })
}).then(()=>{
  console.log('Process Successfully Completed')
})
.catch(function(error) {
    console.error("Error removing document: ", error);
});
})


module.exports = booking;