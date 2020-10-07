const { QuerySnapshot } = require('@google-cloud/firestore');
const express = require('express');
const { doc } = require('../database/database');
const dash = express.Router();
const db = require('../database/database');


dash.get('/:id',(req,res) =>{
    var date = new Date().toISOString().slice(0,11);
    var datestart = date + '00:00:00';
    var dateend = date + '23:59:00';
    var id = req.params.id
    var data ={}
    var doc = db.collection('Services').doc(id)

    var customers = doc.collection('Customers').get()
    .then(querySnapshot =>{
        data.customers = querySnapshot.size;
        doc.collection('ongoing').get()
        .then(querySnapshot =>{
            data.inProgress = querySnapshot.size;
            doc.collection('Completed').get()
            .then(querySnapshot =>{
                data.completed = querySnapshot.size;
                doc.collection('Events').where('start','<',dateend).where('start','>',datestart).get()
            .then(querySnapshot=>{
                data.today = querySnapshot.size;
                res.send(data)
            })
            })
        })
    })
});

dash.get('/completed/:id',(req,res)=>{
    var id = req.params.id
    var data =[]

    db.collection('Services').doc(id).collection('Completed').get()
    .then(querySnapshot=>{
        querySnapshot.forEach(doc=>{
            let event = {}
            event.CustName =doc.data().CustName;
            event.vehicle= doc.data().VehicleDetails.regNo;
            event.rating = doc.data().Rating;
            event.date = doc.data().EndDate;
            event.service= doc.data().ServiceType;
            event.custId= doc.data().CustId;
            event.id=doc.id;
            data.push(event);
        })

        res.send(data);
    })
})

module.exports = dash;