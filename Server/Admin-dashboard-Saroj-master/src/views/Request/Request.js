import React, { Component } from 'react';
import firebase from "firebase";
import Modal from 'react-awesome-modal';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Pagination, PaginationItem, PaginationLink, Table, Button } from 'reactstrap';

const GarageReg = props => (
  <tr>
      <td>{props.full_name}</td>
      <td>{props.email}</td>
      <td>{props.user_type}</td>
      <td>{props.Rating}</td>
      <td> <button onClick={() => props.openImage()} >View BR</button></td>
      <td>{props.isVerified ? 'true' : 'false'}</td>
  </tr>
)

class garage extends Component {

  
  

  

    constructor(props){
        super(props);
        this.state={
          email: '',
          password: '',
          full_name: '',
          user_type: '',
          gardata: '',
          yasa: 'null',
          Rating: '',
          Verify: '',
          BRPhoto: '',
          Verification:'',
          show: false,
          photo: null,
          isVerified:false,
          visible:false,
          id: '',
          isSubmited: false,
          initialVerified: false,
          users: null,
          db: null
        }

   }

//    openModal() {
//     this.setState({
//         visible : true
//     });
// }

closeModal() {
  this.setState({
      visible : false,
      show: false
  });
}

   componentDidMount(){
    const url = "http://localhost:5000/admin/profile";
    // Axios
    //        .get(url)
    //        .then( response => {
    //          console.log(response.data);
    //          this.setState({
    //            Name:response.data.full_name,
    //            Email:response.data.Email,
    //            UserType:response.data.user_type
    //           });
    //           console.log(this.state.Image);                           
            
    //         }
    //   )
    //   .catch((err) => console.log(err))

    if(!firebase.apps.length){

      firebase.initializeApp({
        apiKey: 'AIzaSyC1I4w3OUaDmITrLrA0TDfhicVwVWDnJrk',
        authDomain: 'servicio-11f11.firebaseapp.com',
        projectId: 'servicio-11f11'
      });
      
    }
    var db = firebase.firestore();
    
    db.collection(`Users`)
      .get()
      .then( Documents => {
        console.log(Documents.docs.length)
        const data = Documents.docs.map( d => {
          return {
            ...d.data(),
            docId: d.id
          }
        });
        this.setState({ yasa: data });

        const gardata = Documents.docs.filter( g => g.data().isVerified===false);
        this.setState({garcount: gardata.length});
        console.log(gardata)
        //console.log(data)
      })
}

Users() {
  let t = {...this.state.yasa};

  const openImage = (photo, isV, id) => {
    
    this.setState({
      photo: photo,
      show: true,
      isVerified:isV,
      initialVerified: isV,
      id: id
    })
    console.log(isV);
    console.log(id);
  }

  
  
  


  //console.log(t)
  return Object.values(t).map(function( currentlist, i){
      console.log(currentlist);
      if(currentlist.isVerified===true)
      return;
      return <GarageReg id={currentlist.docId} openImage={() => openImage(currentlist.Photo, currentlist.isVerified, currentlist.docId)} isVerified={currentlist.isVerified} image={currentlist.Photo} email={currentlist.Email} full_name={currentlist.Service_Name} user_type={currentlist.user_type} 
      Rating={currentlist.Rating} BRPhoto={currentlist.BRPhoto} Verify={currentlist.Verification} key={i} />;
  })
}

   
submitVerified = () => {
  firebase.firestore().doc(`Users/${this.state.id}`)
  .update({
    isVerified: this.state.isVerified
  }).then((d)=> {
    console.log(d);
  }).catch((e)=> {
    console.log(e);
  })

  this.setState({
    isSubmited: true
  })

  this.closeModal();

}


setVerified = () => {

  console.log("setVerified")

  this.setState({
    isVerified: !this.state.isVerified,
    
  });

  
  


  // db.collection(`Users`)
  // .where("Email" , "==", "rosicoh983@trufilth.com")
  // .update({
  //   isVerified: this.state.isVerified
  // }).then((d)=> {
  //   console.log(d);
  // }).catch((e)=> {
  //   console.log(e);
  // })
  
  //firebase
}






  render() {
    return (
      <div className="animated fadeIn">
        <div>

{/* <Modal show={this.state.show} >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body><img src={this.state.photo ? this.state.photo : ''}/></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" >
            Close
          </Button>
          <Button variant="primary" >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}

      <Modal visible={this.state.show} width="400" height="500" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div>
                        <h1>Title</h1>
                        <p>Some Contents</p>
                        <div style={{maxHeight:'50px',maxWidth:'150px'}}>
                        < img style={{height:'100%',width:'100%', objectFit: 'cover'}} src={this.state.photo ? this.state.photo : ''}/> </div>
                        {(this.state.isVerified && this.state.isSubmited) || this.state.initialVerified ? null : <input type="checkbox" value={this.state.isVerified} onChange={this.setVerified}></input>}
                        <a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>
                        {(this.state.isVerified && this.state.isSubmited)  || this.state.initialVerified ? null : <button onClick={this.submitVerified}>Submit</button>}
                    </div>
      </Modal>
      
            
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>Registered Garage Centers {this.state.garcount}

              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>User Type</th>
                    <th>Rating</th>
                    <th>BRPhoto</th>
                    <th>Status</th>
                  </tr>
                  </thead>
                  <tbody>

                  { this.Users() }
                        
                  
                  
                  </tbody>
                </Table>
                
               
                <Pagination>
                  <PaginationItem disabled><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                </Pagination>
              </CardBody>
            </Card>
         
            
            
       </div>
      </div>

    );
  }
}

export default garage;