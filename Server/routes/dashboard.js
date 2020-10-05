const { QuerySnapshot } = require('@google-cloud/firestore');
const express = require('express');
const dash = express.Router();
const db = require('../database/database');


dash.get('/:id',(req,res) =>{
    var date = new Date().toISOString().slice(0,11);
    var datestart = date + '00:00:00';
    var dateend = date + '23:59:00';
    console.log(dateend);
    var id = req.params.id
    var data ={}
    var doc = db.collection('Services').doc(id)

    var customers = doc.collection('Customers').get()
    .then(querySnapshot =>{
        console.log(querySnapshot.size);
        data.customers = querySnapshot.size;
        doc.collection('ongoing').get()
        .then(querySnapshot =>{
            console.log(querySnapshot.size);
            data.inProgress = querySnapshot.size;
            doc.collection('Completed').get()
            .then(querySnapshot =>{
                console.log(querySnapshot.size);
                data.completed = querySnapshot.size;
                doc.collection('Events').where('start','<',dateend).where('start','>',datestart).get()
            .then(querySnapshot=>{
                data.today = querySnapshot.size;
                console.log(querySnapshot.size);
                res.send(data)
            })
            })
        })
    })

   
    
});

module.exports = dash;