const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require("socket.io");
const db = require('./database/database');


const app = express();

const port = 5000;

const server = http.createServer(app);
const io = socketIO(server);

const user = require('./routes/user');
const booking = require('./routes/bookings');
const event = require('./routes/calendar');


app.use(cors());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', path.join(__dirname, 'UI/src/views'));
app.set('view engine', 'ejs');
//app.engine('jsx', require('express-react-views').createEngine());

app.use('/user',user);
app.use('/bookings',booking);
app.use('/event',event);


app.get('/',(req,res) =>{
    res.send('Hello World!')
});

 io.on("connection",(socket) =>{
     console.log("New Client connected");
     let doc = db.collection('Bookings')

     let observer = doc.onSnapshot(querySnapshot =>{
         
         var response= querySnapshot.size;
         socket.emit("FromAPI",response);
    
    },err =>{
         console.log(`Encountered an error : ${err}`) }
    );

 })


server.listen(port,()=>{
    console.log(`server running at htttp//localhost:${port}`);
    
    
});

module.exports = io;