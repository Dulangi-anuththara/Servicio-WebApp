import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Row, TabContent, TabPane } from 'reactstrap';
import Axios from 'axios';
import {
  BrowserRouter as Router,
  withRouter,
  Switch,
  Route,
  Link,
  Redirect,
  useParams
} from "react-router-dom";

class InProgress extends Component {

  constructor(props) {
    super(props);

    
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: 0,
      data:[]
    };
    const url=`http://localhost:5000/ongoing/list/${this.props.uid}`
    Axios.get(url)
    .then((response)=>{
      console.log(response.data);
      this.setState({
        data:response.data
      })
    })
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <div className="animated fadeIn">

       
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>List Group</strong> <small>with TabPanes</small>
              </CardHeader>
              <CardBody>               
              <Row>
              <Col xs="4">
              {this.state.data.map((item,index)=>               
                
                <ListGroup id="list-tab" role="tablist">
                <ListGroupItem onClick={() => this.toggle(index)} action active={this.state.activeTab === index} onDoubleClick={()=> this.props.history.push(`ongoing/${item.id}`)} >{item.VehicleDetails.brand} - {item.ServiceType}</ListGroupItem>
                </ListGroup>                          
              
            )}
            </Col>
            <Col xs="8">
            <TabContent activeTab={this.state.activeTab}>
             {this.state.data.map((item,index)=>     
              
                
                  <TabPane tabId={index} >
                  <p>Customer Name - {item.CustName}<br></br>
                 Email - {item.custDetails.email}<br></br>
                 Tel. No - {item.custDetails.tel_num}<br></br>
                  Veh. Model - {item.VehicleDetails.model}<br></br>
                  </p>
                  </TabPane>               
              
              
            )}
            </TabContent>
                </Col>
                </Row>

                
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(InProgress);
