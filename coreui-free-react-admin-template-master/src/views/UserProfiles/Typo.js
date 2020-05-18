import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table , Button } from 'reactstrap';

class Typo extends Component {
  render() {
    return (
      <div className="animated fadeIn">
  
        <div className="card">
          
          <div className="card-body">
            
            <div className="bd-example bd-example-type">
              <table className="table">
                <tbody>
                
                <tr>
                  <td><span className="display-2">Company Name</span></td>
                  <td align="justify">
                  
                    
                  </td>
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
                About Me

                <Button color="success">
                  <i className="fa fa-pencil fa-lg"></i>&nbsp;Edit Profile
                </Button>
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

export default Typo;
