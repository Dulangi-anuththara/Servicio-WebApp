const express = require('express');
const user = express.Router();

user.get('/',(req,res) =>{
    
    console.log("Hi I'm inside the server");
    res.render('/UserProfiles/UserForm',{});
});
    

module.exports = user;