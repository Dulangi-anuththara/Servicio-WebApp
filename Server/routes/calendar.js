const express = require('express');
const Events = express.Router();
const db = require('../database/database');

Events.get('/',(req,res) =>{
    console.log("Requested for data")
    let data = [];
    let eventsref = db.collection('Events');
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

Events.post('/add',(req,res) => {
    //console.log(req.body);
    let data ={
        id:req.body.id,
        start:req.body.start,
        end:req.body.end,
        text:req.body.text
    };

    //let Image = req.body.Image;
    console.log(req.body);
    let setDoc = db.collection('Events').doc(req.body.id).set(data)
                    .then(function() {
                        console.log("Document successfully written!");
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
    
    //res.redirect('http://localhost:3000/#/profile');
   res.send('Details Updated successfully');
});

module.exports = Events;