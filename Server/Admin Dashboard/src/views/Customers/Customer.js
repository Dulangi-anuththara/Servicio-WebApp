import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import Axios from 'axios';

class Customer extends Component {

    constructor(props){
        super(props);
        this.state={
            data:['dd']
        }

        const url= 'http://localhost:5000/customers';
    Axios.get(url).then(res => {       
        
        console.log(res.data)
        this.setState({
        data:res.data,
      });
     
    })

    }










  render() {
    return (
      <div className="animated fadeIn">
      
            
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>Customers

              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                  <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Email</th>
                    <th>Status</th>
                  </tr>
                  </thead>
                  <tbody>

                      {this.state.data.map((item,index) =>
                                    <tr>
                                    <td>{item.Name}</td>
                                    <td>{item.Address}</td>
                                    <td>{item.Email}</td>
                                    <td>
                                      <Badge color="success">Active</Badge>
                                    </td>
                                  </tr>

                      )}
                  
                  
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

    );
  }
}

export default Customer;
