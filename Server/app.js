const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require("socket.io");
const db = require('./database/database');


const app = express();

const port = 5000;

global.id = undefined;

const server = http.createServer(app);
const io = socketIO(server);

const user = require('./routes/user');
const booking = require('./routes/bookings');
const event = require('./routes/calendar');
const customers = require('./routes/customers');
const ongoing = require('./routes/ongoing');
const messaging = require('./routes/messaging')
const dashboard = require('./routes/dashboard');


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
app.use('/customers',customers);
app.use('/ongoing',ongoing);
app.use('/msg',messaging);
app.use('/dashboard',dashboard);


app.get('/',(req,res) =>{
    res.send('Hello World!')
});

 io.on("connection",(socket) =>{

     id = socket.handshake.query.key;
     console.log(socket.handshake.query.key);
     console.log("New Client connected");
     let doc = db.collection('Services').doc(id).collection('Bookings').where('BookingStatus','in',['Pending','Not Available'])

     let observer = doc.onSnapshot(querySnapshot =>{
         
         var response= querySnapshot.size;
         socket.emit("FromAPI",response);
    
    },err =>{
         console.log(`Encountered an error : ${err}`) }
    );

 })

 app.post('/notify', (req, res) => {
    console.log('payment:', req.body);
    let today = new Date();
    const data = {
        userId: id,
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
        card_expiry: req.body.card_expiry,
        created: today
      };

    //const hash = md5(req.body.merchant_id+req.body.order_id+req.body.payhere_amount+req.body.payhere_currency+req.body.status_code+md5(payhere_secret).toUpperCase()).toUpperCase();
     // console.log(hash);

    const start = async function(){
        const result = await db.collection('Payment').add(data);
        const ser = db.collection('Services').doc(id);
        const res = await ser.update({
            paymentStatus: req.body.status_code
        });
        console.log(result);
        console.log(res);
    }

    start();
    
      
    res.sendStatus(200);

});


server.listen(port,()=>{
    console.log(`server running at htttp//localhost:${port}`);
    
    
});

module.exports = io;