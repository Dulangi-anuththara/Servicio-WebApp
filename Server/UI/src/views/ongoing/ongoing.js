import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Button, FormGroup, Input, Label} from 'reactstrap';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Image from 'react-bootstrap/Image'
import axios from 'axios' ;

const percentage = 66;

export default class ongoing extends Component {
    render() {
        return (
            <div className="animated fadeIn">
  
        <div className="card">
          
          <div className="card-body">
            
            <div className="bd-example bd-example-type">
             
                  
                <Card>
                  <Row>
                  <Col xs="6">
                      <Row><span className="h1" style={{paddingLeft:20}}>h1. Bootstrap heading</span></Row>
                      <Row><span style={{paddingLeft:20}}>Customer Name</span></Row> 
                     <Row><span style={{paddingLeft:20}}>Customer Id</span></Row> 
                     <Row><span style={{paddingLeft:20}}>Customer Number</span></Row>   
                 </Col>
                  <Col xs="6" >
                      <div style={{alignItems:'center'}}>

                     <Row><span style={{paddingLeft:20,paddingTop:50}}>Customer Name</span></Row>   
                     <Row><span style={{paddingLeft:20}}>Customer Id</span></Row> 
                     <Row><span style={{paddingLeft:20}}>Customer Number</span></Row>   
                     </div>
                  </Col>            
                  </Row>
                  </Card>
                  <Row>
                <Col>
            <Card>
            <CardBody>

            <CircularProgressbar value={percentage} text={`${percentage}%`} />;
            
            </CardBody>
          </Card></Col>
                  </Row>
                
            </div>
          </div>
        </div>


        <Row>
          <Col xs="0" lg="12">
          </Col>
        </Row>
  
      </div>
        )
    }
}

