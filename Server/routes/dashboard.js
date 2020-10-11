const { QuerySnapshot } = require('@google-cloud/firestore');
const express = require('express');
<<<<<<< HEAD
=======
const { doc } = require('../database/database');
>>>>>>> Dulangi
const dash = express.Router();
const db = require('../database/database');


dash.get('/:id',(req,res) =>{
    var date = new Date().toISOString().slice(0,11);
    var datestart = date + '00:00:00';
    var dateend = date + '23:59:00';
<<<<<<< HEAD
    console.log(dateend);
=======
>>>>>>> Dulangi
    var id = req.params.id
    var data ={}
    var doc = db.collection('Services').doc(id)

    var customers = doc.collection('Customers').get()
    .then(querySnapshot =>{
<<<<<<< HEAD
        console.log(querySnapshot.size);
        data.customers = querySnapshot.size;
        doc.collection('ongoing').get()
        .then(querySnapshot =>{
            console.log(querySnapshot.size);
            data.inProgress = querySnapshot.size;
            doc.collection('Completed').get()
            .then(querySnapshot =>{
                console.log(querySnapshot.size);
=======
        data.customers = querySnapshot.size;
        doc.collection('ongoing').get()
        .then(querySnapshot =>{
            data.inProgress = querySnapshot.size;
            doc.collection('Completed').get()
            .then(querySnapshot =>{
>>>>>>> Dulangi
                data.completed = querySnapshot.size;
                doc.collection('Events').where('start','<',dateend).where('start','>',datestart).get()
            .then(querySnapshot=>{
                data.today = querySnapshot.size;
<<<<<<< HEAD
                console.log(querySnapshot.size);
=======
>>>>>>> Dulangi
                res.send(data)
            })
            })
        })
    })
<<<<<<< HEAD

   
    
});

=======
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

dash.get('/image/:id',(req,res)=>{
    var id = req.params.id
    db.collection('Services').doc(id).get()
    .then(documentSnapshot =>{
        var Image = documentSnapshot.data().Image;
        res.send(Image);
    })
})

>>>>>>> Dulangi
module.exports = dash;