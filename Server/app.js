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

global.uid = undefined;

app.use(cors());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', path.join(__dirname, 'UI/src/views'));
app.set('view engine', 'ejs');
//app.engine('jsx', require('express-react-views').createEngine());

app.use('/user',user);
app.use('/bookings',booking);


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

 app.post('/id', (req,res) => {
    console.log('id', req.body);
    uid = req.body.userId;
    console.log(uid);

});

 app.post('/notify', (req, res) => {
    console.log('payment:', req.body);
    const data = {
        merchant_id: req.body.merchant_id,
        payment_id: req.body.payment_id,
        payhere_amount: req.body.payhere_amount,
        payhere_currency: req.body.payhere_currency,
        status_code: req.body.status_code,
        md5sig: req.body.md5sig,
        status_message: req.body.status_message,
        method: req.body.method,
        card_holder_name: req.body.card_holder_name,
        card_no: req.body.card_no,
        
      };
      
    const start = async function(){
        const result = await db.collection('Payment').doc(uid).set(data);
        console.log(result);
    }

    start();
    
      
    res.sendStatus(200);

});


server.listen(port,()=>{
    console.log(`server running at htttp//localhost:${port}`);
    
    
});

module.exports = io;