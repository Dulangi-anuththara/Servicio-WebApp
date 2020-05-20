const express = require('express');
const port = 5000;
const app = express();
const user = require('./routes/user');

app.get('/',(req,res) =>{
    res.send('Hello World!')
});

app.use('/user',user);

app.listen(port,()=>{
    console.log(`server running at htttp//localhost:${port}`);
});