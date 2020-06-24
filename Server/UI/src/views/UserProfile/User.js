import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table , Button, FormGroup, Input, Label } from 'reactstrap';
import axios from 'axios' ;
import { Link } from 'react-router-dom';
import FittedImage from 'react-fitted-image';
import { Dialog, DialogActions, DialogContent, DialogContentText,DialogTitle, TextField } from "@material-ui/core";
import { storage } from "../../storage"

class User extends Component {

  constructor(){

      super()

      this.state = {
          Test:"",
          Name:"",
          Registration_No:"",
          Address:"",
          Email:"",
          Telephone:"",
          Image:'',
          open:false,       
        }
        
      } 

    componentDidMount(){
    const url = "http://localhost:5000/user/profile";
    axios
                        .get(url)
                        .then( response => {
                                this.setState({
                                  Name:response.data.Name,
                                  Registration_No:response.data.Registration_No,
                                  Address:response.data.Address,
                                  Email:response.data.Email,
                                  Telephone:response.data.Telephone,
                                  Image:response.data.Image,
                                })                           
                              
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
    
    console.log(this.state.Test.name)
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
        const path= "http://localhost:5000/user/imgUpload";
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
                <tr>
                  <div style={{height:300,backgroundImage:`url(${this.state.Image})`,borderRadius:'6px'}}>          
                          
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
          <Col xs="0" lg="12">
            <Card>
              <CardHeader>

                <Row>
                <Col col="12" xl className="mb-3 mb-xl-0">
                About Me
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
                <Table responsive borderless>
                  
                  <tbody>
                  <tr>
                    <td className="h4">Registration No.</td>
                    <td className="h5">{this.state.Registration_No}</td>
                    
                  </tr>
                  <tr>
                    <td className="h4">Address</td>
                    <td className="h5">{this.state.Address}</td>
                    
                  </tr>
                  <tr>
                    <td className="h4">Email</td>
                    <td className="h5">{this.state.Email}</td>
                    
                  </tr>
                  <tr>
                    <td className="h4">Telephone No.</td>
                    <td className="h5">{this.state.Telephone}</td>
                    
                  </tr>
                 
                  </tbody>
                </Table>
                
              </CardBody>
            </Card>
          </Col>
        </Row>
  
      </div>
    );
  }
}



export default User;
