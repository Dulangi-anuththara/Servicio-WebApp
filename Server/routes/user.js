const express = require('express');
const user = express.Router();
const db = require('../database/database');

user.get('/profile',(req,res) =>{
    
   const profile = db.collection('Profile');
   let getDoc = profile.doc('1').get()
                .then( doc => {
                    if(!doc.exists){
                        console.log('No such Document');
                    } else {
                        //console.log('Document Data :',doc.data());
                        res.send(doc.data());
                    }
                })
});

user.post('/profile/edit',(req,res) => {
        //console.log(req.body);
        let data ={
            Name:req.body.Name,
            Registration_No:req.body.Registration_No,
            Address:req.body.Address,
            Email:req.body.Email,
            Telephone:req.body.Telephone,
            Image:req.body.Image,
        };

        let setDoc = db.collection('Profile').doc('1').set(data);
        //res.redirect('http://localhost:3000/#/profile');
       res.send('Details Updated successfully');
});
    

module.exports = user;