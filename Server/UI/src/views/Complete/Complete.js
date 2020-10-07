import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import Axios from 'axios' ;

class Complete extends Component {
    constructor(props){
        super(props)

        this.state={
            completed:[]
        }

    }
    componentDidMount(){
        const url= `http://localhost:5000/dashboard/completed/${this.props.uid}`;
        Axios.get(url)
        .then(response=>{
            console.log(response.data)
            this.setState({
                completed:response.data
            })
        })
    }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>

          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> <strong>Completed</strong><small> Tasks</small>
              </CardHeader>
              <CardBody>
                <Table responsive bordered>
                  <thead>
                  <tr>
                  <th>Vehicle</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Service</th>
                <th>Status</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.completed.map(item=>
                    <tr>
                    <td>{item.vehicle}</td>
                    <td><Link to={`/customer/${item.custId}`}>{item.CustName}</Link></td>
                    <td>{item.date}</td>
                    <td>{item.service}</td>
                    <td>
                      {item.rating >3 &&
                        <Badge color="success">{item.rating}</Badge>
                      }
                      { item.rating < 4 &&

                        <Badge color="danger">{item.rating}</Badge>
                      }
                      
                    </td>
                  </tr>
          )}
                  </tbody>
                </Table>
                <Pagination>
                  <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem className="page-item"><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                </Pagination>
              </CardBody>
            </Card>
          </Col>

        </Row>
      </div>

    );
  }
}

export default withRouter(Complete);
