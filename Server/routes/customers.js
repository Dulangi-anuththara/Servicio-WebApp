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

module.exports = customer;