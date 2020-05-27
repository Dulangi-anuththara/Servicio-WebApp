const express = require('express');
const path = require('path');
var cors = require('cors');

const app = express();

const port = 5000;
const __dirnameView = "C:/Users/ranjith.gamage/Documents/Dulangi/Servicio-WebApp/coreui-free-react-admin-template-master/src";

const user = require('./routes/user');


app.use(cors());

app.set('views', path.join(__dirnameView, 'views'));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());



app.use('/user',user);


app.get('/',(req,res) =>{
    res.send('Hello World!')
});



app.listen(port,()=>{
    console.log(`server running at htttp//localhost:${port}`);
    
});
