const express = require('express');
const user = express.Router();

user.get('/profile',(req,res) =>{
    
    console.log("Hi");
    res.render('UserProfiles/UserForm');
});
    

module.exports = user;