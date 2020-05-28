import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table , Button } from 'reactstrap';
import axios from 'axios' ;
import { Link } from 'react-router-dom'

class User extends Component {


 /* handleChange = (e)=>{
    console.log("Im here now");
    const url = "http://localhost:3000/user/";
    axios
                        .get(url)
                        .then( response =>
                                {console.log("good "+response)}
                        )
                        .catch((err) => console.log(err))
  }*/

  render() {
    return (
      <div className="animated fadeIn">
  
        <div className="card">
          
          <div className="card-body">
            
            <div className="bd-example bd-example-type">
              <table className="table">
                <tbody>
                
                <tr>
                  <td align="justify"><img src={'../../assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" /></td>
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
                <Link to='/Edit'>
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
                    <td>Registration No.</td>
                    <td>2012/01/01</td>
                    
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td>2012/02/01</td>
                    
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>2012/02/01</td>
                    
                  </tr>
                  <tr>
                    <td>Telephone No.</td>
                    <td>2012/03/01</td>
                    
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
