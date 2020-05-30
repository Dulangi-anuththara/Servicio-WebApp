import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table , Button } from 'reactstrap';
import axios from 'axios' ;
import { Link } from 'react-router-dom'

class User extends Component {

  constructor(){

      super()

      this.state = {
          Name:"",
          Registration_No:"",
          Address:"",
          Email:"",
          Telephone:"",

        
      }
        
      }

  


    componentDidMount(){
    const url = "http://localhost:5000/user/profile";
    axios
                        .get(url)
                        .then( response => {
                                //console.log(response.data);
                                this.setState({
                                  Name:response.data.Name,
                                  Registration_No:response.data.Registration_No,
                                  Address:response.data.Address,
                                  Email:response.data.Email,
                                  Telephone:response.data.Telephone

                                })                           
                              
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
                    <td align="justify"><span className="display-1">{this.state.Name}</span></td>
                </tr>
               
                </tbody>
              </table>
            </div>
          </div>
        </div>


        <Row>
          <Col xs="0" lg="9">
            <Card>
              <CardHeader>

                <Row>
                <Col col="12" xl className="mb-3 mb-xl-0">
                About Me
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Link to={{
                  pathname:'/Edit',
                  data:this.state,
                }}>
                <Button color="success" className="align-items-center" onClick={this.handleChange}>
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
