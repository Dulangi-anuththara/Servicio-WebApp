const express = require('express');
const completed = express.Router();
const db = require('../database/database');

completed.get('/:ServiceId',(req,res)=>{
    var ServiceId = req.params.ServiceId

    db.collection('Services').doc(ServiceId).collection('Completed').get()

})
completed.get('/today/:ServiceId',(req,res)=>{
    var ServiceId = req.params.ServiceId;
    var today = new Date()
    var todayDate = today.getFullYear()+'-'+today.getMonth()+'-'+today.getDate()
    var data = []
    db.collection('Services').doc(ServiceId).collection('Completed').get()
    .then((querySnapshot)=>{
            querySnapshot.forEach(doc=>{
                    var date = new Date(doc.data().Date)
                    var bookingDate = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate()
                    if(bookingDate==todayDate){
                        var booking = doc.data()
                        booking.id =doc.id
                        data.push(booking)
                    }

            })

            res.send(data);
    })
})