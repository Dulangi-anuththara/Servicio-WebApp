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

user.post('/imgUpload',(req,res)=>{

    let data ={
        Image:req.body.Image
    }
    let docRef = db.collection('Profile').doc('1');
    let setDoc = docRef.update(data);
     res.send("Done");
     
})


user.post('/profile/edit',(req,res) => {
        //console.log(req.body);
        let data ={
            Name:req.body.Name,
            Registration_No:req.body.Registration_No,
            Address:req.body.Address,
            AddressTwo:req.body.AddressTwo,
            City:req.body.City,
            Email:req.body.Email,
            Telephone:req.body.Telephone,
            Image:req.body.Image,
        };

        //let Image = req.body.Image;
        console.log(req.body);
        let setDoc = db.collection('Profile').doc('1').set(data);
        //res.redirect('http://localhost:3000/#/profile');
       res.send('Details Updated successfully');
});
    

module.exports = user;