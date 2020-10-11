const express = require('express');
const messaging= express.Router();
const db = require('../database/database');
const { response } = require('express');

messaging.get('/:CustId/:ServiceId',(req,res)=>{
    
    const CustId = req.params.CustId
    const ServiceId = req.params.ServiceId
     let data = [];
     console.log(ServiceId + " " + CustId)
     db.collection('Messaging').doc(CustId).collection('Services').doc(ServiceId).collection('msg').orderBy('time','asc').get()
     .then((querySnapshot)=>{
         querySnapshot.forEach(doc =>{

             let message ={}
             message.data ={}
             if(doc.data().id == 0){
                 message.author = 'them'
                 
             }
             else{
                 message.author = 'me'
             }


             if(doc.data().type == 'text'){
                 message.type = doc.data().type
                 message.data.text =doc.data().text
                 data.push(message)
             }
             else if(doc.data().type == 'emoji'){
                message.type = doc.data().type
                message.data.code =doc.data().data.code
                data.push
             }
         })
     })
     .then(()=>{
        db.collection('Services').doc(ServiceId).collection('Customers').doc(CustId).update({
            count:0
        })
        .then(()=>{
            res.send(data);
        })
     })
     

 })

 messaging.post('/add/:CustId/:ServiceId',(req,res)=>{
     console.log("In here msg app");
    const CustId = req.params.CustId
    const ServiceId = req.params.ServiceId
    var currentDate = new Date();
    var data ={
        id:1,
        type:req.body.type,
        text:req.body.data.text,
        time:currentDate,
        serviceread:1,
        customerservice:0,
    }
    db.collection('Messaging').doc(CustId).collection('Services').doc(ServiceId).collection('msg').add(data)
    .then(response=>{
        console.log(ServiceId)
        console.log(CustId)
        var readStatus ={
            read:true
        }
        db.collection('Messaging').doc(CustId).collection('Services').doc(ServiceId).set(readStatus)
        .then(()=>{
           // console.log(response)
            res.send("Task Completed")
        })
        //res.send("Task Completed")
    })


    
 })

 messaging.get('/:Id',(req,res)=>{
    
    const Id = req.params.Id
    var results = []
    db.collection('Services').doc(Id).collection('Customers').get()
    .then(querySnapshot =>{
        querySnapshot.forEach(doc =>{
            var data = doc.data()
            data.id=doc.id
            results.push(data)
        })       
    })
    .then(()=>{
        res.send(results)
    })
    
 })
module.exports = messaging