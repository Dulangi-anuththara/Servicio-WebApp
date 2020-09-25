import React , { Component } from 'react';
import { Button, FormControl, Select, MenuItem, InputLabel} from '@material-ui/core';
//import background from '../assets/images/login_background.jpg';
import fire from '../../../storage/index';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import '../Login/LoginPage.css';
import lgo from "../../../assets/images/lgo.jpg"
import { storage } from "../../../storage";
import { Dialog, DialogActions, DialogContent,DialogTitle, TextField, } from "@material-ui/core";
import { Badge, Card, CardBody, CardHeader, Col, Row, Table , FormGroup, Input, Label } from 'reactstrap';




class Register extends Component {
    state = {
        email: '',
        password: '',
        Service_name: '',
        // grade: '',
        user_type: '',
        Photo: '',
        SearchKey: '',
        Rating:0,
        Desc:'',
        redirect: null,
        isVerified: false,
        Image:'',
        Verification:''
    }

    handleClickOpen = () => {
      this.setState({
        open:true
      })
    };
    
    handleClose = () => {
    this.setState({
      open:false
    })
    };

    handleChange = (e) =>{
      if(e.target.files[0]){
        this.setState({Photo:e.target.files[0]});
        
      }
      ;
  }

  handleUpload = () => {
    this.setState({
      open:false
    })
    console.log(this.state.Test)
    
      // .then(url =>{
      //   console.log(url);
        
      //   const data ={
      //     Image:url,
      //   }
      //   const path= "http://localhost:5000/user/imgUploadBR";
      //   axios.post(path,data)
      //         .then((response)=>{
      //           console.log('Good. '+response.data);
      //           // this.props.history.push('/profile');
                
      //       })
      //       .catch((err)=>{

      //         console.log(err);
      //       });

      //  this.setState({
      //    Image:url,
      //  })
        
    //   })
    // })
  }

    setEmail = (event) => {
        this.setState({email: event.target.value});
    }

    setPassword = (event) => {
        this.setState({password: event.target.value});
    }

    setName = (event) => {
        this.setState({full_name: event.target.value});

      var names = event.target.value.toUpperCase().trim();
      this.setState({SearchKey: names[0]});
    }

    setDesc = (event) => {
      this.setState({Desc: event.target.value});

  }

  //   setLetter = (event) => {
  //     var names = event.target.value.trim();
  //     this.setState({SearchKey: names[0]});
  // }

    setUtype = (event) => {
        this.setState({
            user_type: event.target.value
        }
        );
    }

    registrationHandler = () => {
      if(this.state.full_name.length === 0){
        alert("Please Enter your business name")
      }
      else if(this.state.email.length=== 0){
        alert("Please Enter an valid Email")
      }
      else if(this.state.password.length === 0 )
      {
        alert("Please Enter a password")
      }
      else if(this.state.user_type.length === 0)
      {
      alert("Enter your User Type")
      } 
else {

  fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(async (res) => {
            var user = fire.auth().currentUser;
            user.sendEmailVerification().then(function() {
                // Email sent.
                console.log(`email sendt`)
                alert("Verification Link sent to your email");
              }).catch(function(error) {
                // An error happened.
              });
              
            var id = user.uid
            this.props.onAuth(id, this.state.user_type);

            //update users username on firebase auth server
            user.updateProfile({
                displayName: this.state.full_name
            }).then((res) => {
                console.log(res);
            }).catch((err => {
                console.log(err);
            }));

            const uploadTask = storage.ref(`images/${this.state.Photo.name}`).put(this.state.Photo);
            uploadTask.on("state_changed", snapshot => {}, error => {
            console.log(error);
           
            },
            ()=>{
            
              storage.ref("images")
              .child(this.state.Photo.name)
              .getDownloadURL()
              .then(URL=>{
                this.setState({Image:URL})
                 
               
                  // grade: this.state.grade
              }).then(res => {
                  console.log(res);
                  fire.firestore().doc(`Users/${id}`).set({
                  user_type: this.state.user_type,
                  Service_Name: this.state.full_name,
                  Email: this.state.email,
                  SearchKey: this.state.SearchKey,
                  BRPhoto: this.state.Image,
                  Rating: this.state.Rating,
                  Description: this.state.Desc,
                  isVerified: this.state.isVerified,
                  //this.setState({redirect: <Redirect to="/dashboard"/>})
              }) })
          
          .catch((err) => {
              console.log(err.message);
              alert(err.message);
          })
              
              
              })
            })

           
}


   
        
    }

    render() {
        return(
            <div style={{
                width: '100%',
                height: '100vh',
                textAlign: 'center',
                //backgroundImage: `url(${background})`,
                //backgroundSize: 'contain'
                // backgroundColor: 'blue',
                
            }}>
                {this.state.redirect}
                {/* <Paper square style={{
                    marginTop: '5%',
                    padding: '20px',
                    height: '80%',
                    width: '30%',
                    display: 'inline-block',

                }}> */}


<div id="register" className="banner h-100 ">
  <div className="d-flex justify-content-center h-100">
    <div className="user_card">
      <div className="d-flex justify-content-center">
        <div className="brand_logo_container">
          <img src={lgo} className="brand_logo" alt="Logo" />
        </div>
      </div>
      <div className="d-flex justify-content-center form_container">
        <form>
          <div className="input-group mb-3">
            <div className="input-group-append">
              <span className="input-group-text"><i className="fas fa-user" /></span>
            </div>
            <input type="text"
                     id="full_name"
                     label="Full Name"
                     onChange={this.setName} onch className="form-control input_user" placeholder="Full Name" required />
                     
          </div>

          <div className="input-group mb-3">
            <div className="input-group-append">
              <span className="input-group-text"><i className="fas fa-at" /></span>
            </div>
            <input type="email"
                    id="email"
                    label="Email"
                    onChange={this.setEmail} className="form-control input_user" placeholder="garage@gmail.com" />
          </div>
          <div className="input-group mb-2">
            <div className="input-group-append">
              <span className="input-group-text"><i className="fas fa-key" /></span>
            </div>
            <input type="password" id="password"
                    label="Password"
                    type="password"
                    onChange={this.setPassword} className="form-control input_pass" placeholder="password" />
          </div>
          <div className="form-group">

            <FormControl  className="input-group-text" component="fieldset" style={{width: '100%'}} >
            <InputLabel style={{ disableAnimation: false }} disableAnimation={false}  className="text-white">Service or Garage?  </InputLabel>
                            <Select
                            labelId="Grade"
                            id="user_type"
                            value={this.state.grade}
                            onChange={this.setUtype}
                            >
                                <MenuItem value={"service"}>Service</MenuItem>
                                <MenuItem value={"garage"}>Garage</MenuItem>
                            </Select>
                        </FormControl>
                </div>

                <div className="input-group mb-2">
            <div className="input-group-append">
              <span className="input-group-text"><i className="fas fa-key" /></span>
            </div>
            <input type="password" id="password"
                    label="Description"
                    type="span"
                    onChange={this.setDesc} className="form-control input_pass" placeholder="Describe About your Company" />
          </div>
          <div>
          
          <Button color="light" onClick={this.handleClickOpen}> Upload your BR <i className="fa fa-camera fa-lg"></i>&nbsp;</Button>
          
          <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                     <DialogTitle id="form-dialog-title">Upload Your Image</DialogTitle>
                        <DialogContent>     
                        
                      <FormGroup row>
                          <Col md="3">
                            <Label htmlFor="file-input">File input</Label>
                          </Col>
                          <Col xs="12" md="9">
                            <Input type="file" id="test" name="test" onChange={this.handleChange} />
                          </Col>
                      </FormGroup>
                      </DialogContent>
                          <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                              Cancel
                            </Button>
                            <Button onClick={this.handleUpload} color="primary">
                              Upload
                            </Button>
                          </DialogActions>
                  </Dialog></div>

          <div className="d-flex justify-content-center mt-3 login_container">
          <Button onClick={this.registrationHandler} className="btn login_btn">Register</Button>
          </div>
        </form>
      </div>
      <div className="mt-4">
        
      </div>
    </div>
  </div>
</div>

            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        token: state.counter
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (token, userType) => dispatch({type: 'LOGIN', value: {token: token, userType: userType}})
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Register);