const express = require('express');
const ongoing = express.Router();
const db = require('../database/database');
const { QuerySnapshot } = require('@google-cloud/firestore');
const { response } = require('express');



ongoing.get('/list/:ServiceId',(req,res)=>{
    console.log("here");
    var serviceId = req.params.ServiceId
    var data = []
    db.collection('Services').doc(serviceId).collection('ongoing').where("progressStage",'<',5).get()
    .then(querySnapshot=>{
        querySnapshot.forEach(doc =>{
                let process =doc.data();
                process.id = doc.id
                data.push(process);
        })

        res.send(data);
    })

})


ongoing.get('/doc/:id/:processId',(req,res)=>{
    var Id = req.params.id
    var process = req.params.processId

    db.collection('Services').doc(Id).collection('ongoing').doc(process).get()
    .then(documentSnapshot=>{
        var data = documentSnapshot.data();
        data.id = documentSnapshot.id

        res.send(data);
    })

})



ongoing.post('/add/:ServiceId/:bookingId',(req,res)=>{

    var ServiceId = req.params.ServiceId;
    var bookingId = req.params.bookingId;
    var data = {}

  db.collection('Services').doc(ServiceId).collection('Bookings').doc(bookingId).get()
  .then(documentSnapshot =>{
      data = documentSnapshot.data()
      data.key  = documentSnapshot.id;           
      
  })
  .then(() =>{      
     db.collection('Customers').doc(data.CustId).get()
     .then(documentSnapshot=>{
        data.custDetails=documentSnapshot.data()        
    })
    .then(()=>{
        db.collection('Customers').doc(data.CustId).collection('Vehicles').doc(data.Vehicle).get()
        .then(documentSnapshot=>{
            data.VehicleDetails=documentSnapshot.data()
            data.progressStage=0
            data.progress=0
            data.status=""
            data.notes=[]
            data.pathColor="#FF1D15"
        })
        .then(()=>{
            db.collection('Services').doc(ServiceId).collection('ongoing').doc(bookingId).set(data)
            .then(()=>{
                db.collection('Customers').doc(data.CustId).collection('ongoing').doc(bookingId).set(data)
                .then(()=>{
                    db.collection('Services').doc(ServiceId).collection('Bookings').doc(bookingId).delete()
                    .then(()=>{
                        db.collection('Customers').doc(data.CustId).collection('Bookings').doc(bookingId).delete()
                        .then(response=>{
                            res.send(response);
                        })
                       
                    })
                })
                
            })            
        })
    })    
     
 })
  .catch(err=>{
      console.log(err);
  })
})



ongoing.post('/stateUpdate/:ServiceId/:bookingId',(req,res)=>{
    var ServiceId = req.params.ServiceId;
    var bookingId = req.params.bookingId;
    console.log(bookingId);

    var data ={
        status:req.body.status,
        progressStage:req.body.progressStage,
        progress:req.body.progress,
        pathColor:req.body.pathColor
    }
    db.collection('Services').doc(ServiceId).collection('ongoing').doc(bookingId).update(data)
    .then(()=>{
        db.collection('Customers').doc(req.body.id).collection('ongoing').doc(bookingId).update(data)
        .then((response)=>{
            res.send(response);
        })
    })
    
})

ongoing.post('/addNotes/:ServiceId/:bookingId',(req,res)=>{
    var ServiceId = req.params.ServiceId;
    var bookingId = req.params.bookingId;
    

    var data ={
       notes:req.body.notes
    }
    db.collection('Services').doc(ServiceId).collection('ongoing').doc(bookingId).update(data)
    .then((response)=>{
        res.send(response);
    })
})


ongoing.get('/completion/:ServiceId/:bookingId',(req,res)=>{
    var ServiceId = req.params.ServiceId;
    var bookingId = req.params.bookingId;
    var data ={}
    var id =""
    
    db.collection('Services').doc(ServiceId).collection('ongoing').doc(bookingId).get()
    .then((documentSnapshot)=>{
        data = documentSnapshot.data();
        db.collection('Services').doc(ServiceId).collection('ongoing').doc(bookingId).delete()
        data.progressStage = 7
        
    })
    .then(()=>{
        id = data.CustId
        db.collection('Customers').doc(id).collection('ongoing').doc(bookingId).delete()
        db.collection('Services').doc(ServiceId).collection('Completed').doc(bookingId).set(data)
        .then(()=>{
            db.collection('Customers').doc(id).collection('Completed').doc(bookingId).set(data)
            .then((response)=>{
        
                res.send(response);
            })
        })
    })
    
})
ongoing.get('/rated/:ServiceId',(req,res)=>{
    var ServiceId = req.params.ServiceId;
    var data = []
    db.collection('Services').doc(ServiceId).collection('ongoing').where('progressStage','==',6).get()
    .then((querySnapshot)=>{
            querySnapshot.forEach(doc=>{
                var booking = doc.data()
                booking.id =doc.id
                data.push(booking)
            })

            res.send(data);
    })
})
ongoing.get('/picked/:ServiceId',(req,res)=>{
    var ServiceId = req.params.ServiceId;
    var data = []
    db.collection('Services').doc(ServiceId).collection('ongoing').where('progressStage','==',5).get()
    .then((querySnapshot)=>{
            querySnapshot.forEach(doc=>{
                var booking = doc.data()
                booking.id =doc.id
                data.push(booking)
            })

            res.send(data);
    })
})
ongoing.get('/completed/:ServiceId',(req,res)=>{
    var ServiceId = req.params.ServiceId;
    var today = new Date()
    var todayDate = today.getFullYear()+'-'+today.getMonth()+'-'+today.getDate()
    var data = []
    db.collection('Services').doc(ServiceId).collection('Completed').get()
    .then((querySnapshot)=>{
            querySnapshot.forEach(doc=>{
                    var date = new Date(doc.data().Date)
                    var bookingDate = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate()
                    if(bookingDate==todayDate){
                        var booking = doc.data()
                        booking.id =doc.id
                        data.push(booking)
                    }

            })

            res.send(data);
    })
})


module.exports = ongoing;