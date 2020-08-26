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
        console.log(querySnapshot.size);
         querySnapshot.forEach(doc =>{
            console.log("here")
             console.log(doc.data());
             let message ={}
             message.data ={}
             if(doc.data().id == 0){
                 message.author = 'them'
                 console.log("here 1")
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
            res.send(data);
     })

 })

 messaging.post('/add/:CustId/:ServiceId',(req,res)=>{
    const CustId = req.params.CustId
    const ServiceId = req.params.ServiceId
    var currentDate = new Date().toUTCString();
    var data ={
        id:1,
        type:req.body.type,
        text:req.body.data.text,
        time:currentDate
    }
    db.collection('Messaging').doc(CustId).collection('Services').doc(ServiceId).collection('msg').add(data)
    .then(response=>{
        console.log(response)
        res.send("Task Completed")
    })


    
 })
 
module.exports = messaging