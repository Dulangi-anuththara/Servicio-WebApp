const express = require('express');
const user = express.Router();

user.get('/',(req,res) =>{
    res.send("Hello I'm user");
});

module.exports = user;