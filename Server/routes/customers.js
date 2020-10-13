const { response } = require('express');
const express = require('express');
const customer = express.Router();
const db = require('../database/database');

customer.get('/',(req,res) => {
    let data = [];
    let customerref = db.collection('Customers');
    let allcustomers = customerref.get()
  .then(snapshot => {
    snapshot.forEach(doc => {
        
        let customer = doc.data();
        customer.id = doc.id;
        data.push(customer);
        //console.log(doc.id, '=>', doc.data());
    });
    
    res.send(data);
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });
})

customer.get('/:id',(req,res)=>{
  var id=req.params.id

  db.collection('Customers').doc(id).get()
  .then(response=>{
    //console.log(response.data());
    res.send(response.data());
  })
})


customer.get('/all/:id',(req,res)=>{

  var id = req.params.id
  var customers = []
  var data = []

  db.collection('Services').doc(id).collection('Customers').get()
  .then(querySnapshot =>{
      querySnapshot.forEach(doc=>{
        customers.push(doc.id)
      })
  })
  .then(()=>{
    db.collection('Customers').where('user_id','in',customers).get()
    .then(querySnapshot =>{
      querySnapshot.forEach(doc=>{
        data.push(doc.data())
      })
    })
    .then(()=>{
      res.send(data)
    })
  })
})
module.exports = customer;