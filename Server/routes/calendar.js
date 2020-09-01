const express = require('express');
const Events = express.Router();
const db = require('../database/database');

Events.get('/:id',(req,res) =>{
    const id = req.params.id
    console.log("Requested for data")
    let data = [];
    let eventsref = db.collection('Services').doc(id).collection('Events');
    let allbookings = eventsref.get()
  .then(snapshot => {
    snapshot.forEach(doc => {
        
        let events = doc.data();
        //events.start =doc.data().start.toDate()
        //events.end = doc.data().end.toDate();
        //events.id = 1;
        data.push(events);
        //console.log(doc.id, '=>', doc.data());
    });
    
    res.send(data);
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });
});

Events.post('/add/:key',(req,res) => {
    const key = req.params.key
    console.log(req.body);
    let data ={
        id:req.body.id,
        start:req.body.bookings.Date,
        end:req.body.bookings.EndDate+":00",
        text:req.body.bookings.ServiceType + ' - ' + req.body.bookings.CustName + '/' + req.body.bookings.Vehicle,
        backColor:"#009DDC",
        tags : {
          category: 0
        }
    };
    console.log(req.body);
    let setDoc = db.collection('Services').doc(key).collection('Events').doc(req.body.id).set(data)
                    .then(function() {
                        console.log("Document successfully written!");
                        db.collection('Services').doc(key).collection('Customers').doc(req.body.bookings.CustId).set({
                          name:req.body.bookings.CustName,
                          photo:"https://img.icons8.com/bubbles/100/000000/man-with-envelope.png",
                          text:`Send message to ${req.body.bookings.CustName}`
                        })
                        .then(()=>{
                          res.send('Details Updated successfully');
                        })
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
});

Events.post('/addMan/:key',(req,res) => {
  const key = req.params.key
 /* let data ={
      id:req.body.id,
      start:req.body.bookings.Date,
      end:req.body.bookings.EndDate+":00",
      text:req.body.bookings.ServiceType + ' - ' + req.body.bookings.CustName + '/' + req.body.bookings.Vehicle
  };
  console.log(req.body);*/
  let setDoc = db.collection('Services').doc(key).collection('Events').doc(req.body.id).set(req.body)
                  .then(function() {
                      console.log("Document successfully written!");
                     /* let setDetails = db.collection('Services').doc(key).collection('Events').doc(req.body.id).collection('Details').set({
                        CustName:req.body.bookings.CustName,
                        CustId:req.body.bookings.CustId,
                        ServiceType:req.body.bookings.ServiceType,
                        Vehicle:req.body.bookings.Vehicle,

                      })
                      .then(()=>{
                        console.log('Details added successfully');
                      })*/
                  })
                  .catch(function(error) {
                      console.error("Error writing document: ", error);
                  });
  
  //res.redirect('http://localhost:3000/#/profile');
 res.send('Details Updated successfully');
});

Events.post('/changeColor/:ServiceId/:key',(req,res)=>{
  console.log("id")
    var ServiceId = req.params.ServiceId
    var key = req.params.key

    let data ={
      backColor:"#20c997",
      tags : {
        category: 1
      }
    }
    db.collection('Services').doc(ServiceId).collection('Events').doc(key).update(data)
    .then(response => {
      console.log("Document successfully written!");
      res.send(response);
      
    })
})




module.exports = Events;