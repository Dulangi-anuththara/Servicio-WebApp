import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Button, FormGroup, Input, Label} from 'reactstrap';
import Image from 'react-bootstrap/Image'
import axios from 'axios' ;
import { Link } from 'react-router-dom';
import FittedImage from 'react-fitted-image';
import { Dialog, DialogActions, DialogContent, DialogContentText,DialogTitle, TextField, } from "@material-ui/core";
import { storage } from "../../storage";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Email, MyLocation, Phone, Toc } from '@material-ui/icons';

class User extends Component {

  constructor(){

      super()

      this.state = {
          Test:"",
          Name:"",
          Registration_No:"",
          Address:"",
          AddressTwo:"",
          City:"",
          Email:"",
          Telephone:"",
          Image:'',
          open:false,       
        }
        
      } 

    componentDidMount(){
    const url = `http://localhost:5000/user/profile/${this.props.uid}`;
    axios
                        .get(url)
                        .then( response => {
                                console.log(response.data);
                                this.setState({
                                  Name:response.data.Service_Name,
                                  Registration_No:response.data.Registration_No,
                                  Address:response.data.Address,
                                  AddressTwo:response.data.AddressTwo,
                                  City:response.data.City,
                                  Email:response.data.Email,
                                  Telephone:response.data.Telephone,
                                  Image:response.data.Photo,
                                });
                                console.log(this.state.Image);                           
                              
                              }
                        )
                        .catch((err) => console.log(err))
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
        this.setState({Test:e.target.files[0]});
        
      }
      ;
  }


  handleUpload = () => {
    this.setState({
      open:false
    })
    console.log(this.state.Test)
    const uploadTask = storage.ref(`images/${this.state.Test.name}`).put(this.state.Test);
    uploadTask.on("state_changed", snapshot => {}, error => {
      console.log(error);
           
    },
    ()=>{
     
      storage.ref("images")
      .child(this.state.Test.name)
      .getDownloadURL()
      .then(url =>{
        console.log(url);
        
        const data ={
          Image:url,
        }
        const path= `http://localhost:5000/user/imgUpload/${this.props.uid}`;
        axios.post(path,data)
              .then((response)=>{
                console.log('Good. '+response.data);
                this.props.history.push('/profile');
                
            })
            .catch((err)=>{

              console.log(err);
            });

       this.setState({
         Image:url,
       })
        
      })
    })
  }
  
  render() {
    return (
      <div className="animated fadeIn">
  
        <div className="card">
          
          <div className="card-body">
            
            <div className="bd-example bd-example-type">
              <table className="table">
                <tbody>
                <tr style={{alignContent:'center'}}><img src={'../../assets/img/avatars/8.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" /></tr>
                <tr>
                  
                  <div style={{height:300,borderRadius:'6px'}}>          
                  <Image src={this.state.Image} roundedCircle style={{alignItems:'center'}}></Image>        
                <Button color="light" className="align-items-center" onClick={this.handleClickOpen} size='lg' style={{marginTop:30,marginLeft:980}}>
                  <i className="fa fa-camera fa-lg"></i>&nbsp;Edit Cover Photo
                </Button>

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
                  </Dialog>
                
                
                
                </div></tr>
                <tr>
                    <td align="center"><span className="h1">{this.state.Name}</span></td>
                </tr>
               
                </tbody>
              </table>
            </div>
          </div>
        </div>


        <Row>
         <Col xs={10} style={{marginLeft:90}}>
            <Card>
              <CardHeader>

                <Row>
                <Col col="12" xl className="mb-3 mb-xl-0">
                My Profile
              </Col>
              <Col xs lg="2">
                <Link to={{
                  pathname:'/Edit',
                  data:this.state,
                }}>
                <Button color="success" className="align-items-center">
                  <i className="fa fa-pencil fa-lg"></i>&nbsp;Edit Profile
                </Button>
                
                </Link>
              
              </Col>
                </Row>
               

                
              </CardHeader>
              <CardBody>
                <List component="nav" aria-label="main mailbox folders">
                    <ListItem button>
                      <ListItemIcon>
                          <Toc></Toc>
                      </ListItemIcon>
                      <ListItemText primary="Register No." />
                      <ListItemText primary={this.state.Registration_No} />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                      <ListItemIcon>
                        <MyLocation></MyLocation>
                      </ListItemIcon>
                      <ListItemText primary="Address" />
                      <ListItemText primary={this.state.Address +"," + this.state.AddressTwo + " " + this.state.City} />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                      <ListItemIcon>
                        <Email/>
                      </ListItemIcon>
                      <ListItemText primary="Email" />
                      <ListItemText primary={this.state.Email} />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                      <ListItemIcon>
                        <Phone></Phone>
                      </ListItemIcon>
                      <ListItemText primary="Telephone No." />
                      <ListItemText primary={this.state.Telephone} />
                    </ListItem>
                  </List>
                  
                
              </CardBody>
            </Card>
          </Col>
        </Row>
  
      </div>
    );
  }
}



export default User;
