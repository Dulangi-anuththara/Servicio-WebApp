import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Button, FormGroup, Input, Label} from 'reactstrap';
import Image from 'react-bootstrap/Image'
import axios from 'axios' ;
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

class Customer extends Component {

  constructor(props){

      super(props)

      this.state = {
               Name:"",
               Email:"",
               Telephone:"",
               image:""
        }
        console.log(this.props.match.params.id)
      } 

    componentDidMount(){
    const url = `http://localhost:5000/customers/${this.props.match.params.id}`;
    axios
                        .get(url)
                        .then( response => {
                                console.log(response.data);
                                this.setState({
                                  Name:response.data.name,
                                  Email:response.data.email,
                                  Telephone:response.data.tel_num,
                                  Image:response.data.Photo,
                                });
                              }
                        )
                        .catch((err) => console.log(err))
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
                  
                  <div style={{height:300,borderRadius:'6px'}}>          
                  <Image src={this.state.Image} style={{alignItems:'center',height:300,width:600,marginLeft:300}}></Image>               
                </div>
                </tr>
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
                Customer Profile
              </Col>
              <Col xs lg="2">
                <Link to={{
                  pathname:'/Edit',
                  data:this.state,
                }}>

                
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
                      <ListItemText primary="Name" />
                      <ListItemText primary={this.state.Name} />
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



export default withRouter(Customer);
