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

completed.get('/yesterday/:ServiceId/:yesterday',(req,res)=>{
    var ServiceId = req.params.ServiceId;
    var yesterday = req.params.yesterday;    
    var data = []
    db.collection('Services').doc(ServiceId).collection('Completed').get()
    .then((querySnapshot)=>{
            querySnapshot.forEach(doc=>{
                    var date = new Date(doc.data().Date).getDate()
                    
                    if(yesterday==date){
                        var booking = doc.data()
                        booking.id =doc.id
                        data.push(booking)
                    }

            })

            res.send(data);
    })
})

completed.get('/month/:ServiceId/:month/:year',(req,res)=>{
    var ServiceId = req.params.ServiceId;
    var month = req.params.month;
    var year = req.params.year 
    var data = []
    db.collection('Services').doc(ServiceId).collection('Completed').get()
    .then((querySnapshot)=>{
            querySnapshot.forEach(doc=>{
                    var date = new Date(doc.data().Date).getMonth()
                    var YEAR = new Date(doc.data().Date).getFullYear()
                    if(month==date && YEAR==year){
                        var booking = doc.data()
                        booking.id =doc.id
                        data.push(booking)
                    }

            })
            console.log(data);
            res.send(data);
    })
})
completed.get('/year/:ServiceId/:year',(req,res)=>{
    var ServiceId = req.params.ServiceId;
    var year = req.params.year 
    var data = []
    db.collection('Services').doc(ServiceId).collection('Completed').get()
    .then((querySnapshot)=>{
            querySnapshot.forEach(doc=>{

                    var YEAR = new Date(doc.data().Date).getFullYear()
                    if(YEAR==year){
                        var booking = doc.data()
                        booking.id =doc.id
                        data.push(booking)
                    }

            })
            console.log(data);
            res.send(data);
    })
})


module.exports = completed;