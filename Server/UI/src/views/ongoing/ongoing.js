import React, { Component } from 'react';
import { Badge, Card,CardTitle,CardText, CardBody, CardHeader, Col, Row, Button, Input, Label, ButtonToolbar,ButtonGroup} from 'reactstrap';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Image from 'react-bootstrap/Image'
import axios from 'axios' ;
import {
  BrowserRouter as Router,
  withRouter,
  Switch,
  Route,
  Link,
  Redirect,
  useParams
} from "react-router-dom";


class ongoing extends Component {
    constructor(props){
        super(props)

        this.handleProgress = this.handleProgress.bind(this);

        this.state={
            progress:0,
            CustId:"Test",
            CustName:"Test",
            PhoneNo:"Test",
            email:"Test",
            Description:"Test",
            ServiceType:"Test",
            VehicleNo:"Test",
            VehicleType:"Test",
            RegNo:"Test",
            year:"Test",
            miledge:"Test",
            pathColor:"#92140C",
            State:"",
            notes:[]

        }
        console.log(this.props.match.params.id);

        const url=`http://localhost:5000/ongoing/doc/${this.props.uid}/${this.props.match.params.id}`
        axios.get(url)
        .then(response =>{

          console.log(response.data);
          this.setState({
            CustId:response.data.CustId,
            CustName:response.data.CustName,
            PhoneNo:response.data.custDetails.tel_num,
            email:response.data.custDetails.email,
            Description:response.data.Description,
            ServiceType:response.data.ServiceType,
            VehicleNo:response.data.Vehicle,
            VehicleType:response.data.VehicleDetails.brand + response.data.VehicleDetails.model,
            RegNo:response.data.VehicleDetails.regNo,
            year:response.data.VehicleDetails.year,            
          })
        })
    }

   handleProgress(e){

      var temp="";
        //  this.setState({
        //    progress:val.target.value
        //  },()=>{
        //    if(val.target.value==5){

        //    }
        //  })
        // console.log(val.target.value);
    if(e.target.value==5){
      temp="Vehicle Accepted"       
    }
    else if(e.target.value == 20){
      temp="Process Started"
    }
    else if(e.target.value == 80){
      temp="Service Finished"
    }
    else{
      temp="Vehicle is ready to pick up"
    }

    this.setState({
      progress:e.target.value,
      State:temp
    },()=>{
      console.log(this.state.State);
      var data ={
        status:this.state.State
      }
      const url=`http://localhost:5000/ongoing/stateUpdate/${this.props.uid}/${this.state.id}`
     
      axios.post(url,data)
      .then(response =>{
        console.log(response.data);
      })
      
    })
 
  }

  handleCompletion(e){
    console.log("Completed");
  }
    render() {
        return (
    <div className="animated fadeIn">  
        <div className="card">          
          <div className="card-body">            
 
        <Row>
            <Col xs="6">
            <Card body >
            <CardHeader tag="h4">Vehicle Details</CardHeader>
                <CardText style={{paddingTop:20}}>Vehicle No: {this.state.VehicleNo} <br></br>
                Vehicle Model: {this.state.VehicleType}<br></br>
                Miledge: {this.state.miledge}<br></br>
                Regist. No: {this.state.RegNo}<br></br>
                Year : {this.state.year}<br></br>
                Description: {this.state.Description}</CardText>
               
          
            </Card>
            
            
            </Col>
            <Col xs="6">
                <Card body >
                <CardHeader tag="h4">Customer Details</CardHeader>
                <CardText style={{paddingTop:20}}>Customer Name: {this.state.CustName}<br></br>
                Customer ID: {this.state.CustId}<br></br>
                Telephone No: {this.state.PhoneNo}<br></br>
                Email: {this.state.email} </CardText>
                
          
            </Card>
            </Col>
        </Row>

        <Row style={{marginTop:30}}>
        <Col sm="12" md={{ size: 5, offset: 2 }}>
        <CircularProgressbar value={this.state.progress} 
                             text={`${this.state.progress}%`}
                                                  
                             styles={buildStyles({
                                    pathColor:`${this.state.pathColor}` ,
                                                    //trailColor: "gold",

                                                    
                                    })}
                             />             
                

            
        </Col>
        <Col md={{ size: 4, offset: 1 }}>

        <Card body>
                <CardTitle tag="h3">Notes</CardTitle>
                </Card>
        
        </Col>
      </Row>
      <Row style={{marginTop:50}}>
        <Col sm="12" md={{ size: 12, offset: 2 }}>
        <ButtonToolbar>
                  <ButtonGroup className="mr-2">
                    <Button style={{backgroundColor:"#FF1D15",borderWidth:0,color:'white'}} size="lg" value={5} onClick={this.handleProgress}>
                    <i className="fa fa-car"></i>&nbsp;Vehicle Arrived</Button>
                  </ButtonGroup>
                  <ButtonGroup className="mr-2">
                    <Button style={{backgroundColor:"#2D7DD2",borderWidth:0,color:'white'}} value={20} size="lg" onClick={this.handleProgress} >
                    <i className="fa fa-hourglass"></i>&nbsp;Started</Button>
                  </ButtonGroup>
                  <ButtonGroup className="mr-2">
                    <Button style={{backgroundColor:"#E3B505",borderWidth:0}} value={80}size="lg" onClick={this.handleProgress}>
                    <i className="fa fa-check"></i>&nbsp;Finished</Button>
                  </ButtonGroup>
                  <ButtonGroup className="mr-2">
                    <Button style={{backgroundColor:"#F45D01",borderWidth:0}} value={90} size="lg" onClick={this.handleProgress}>
                    <i className="fa fa-bell"></i>&nbsp;Ready to pickup</Button>
                  </ButtonGroup>
                  <ButtonGroup className="mr-2">
                    <Button style={{backgroundColor:"#97CC04",borderWidth:0}} value={100} size="lg" onClick={this.handleProgress}>
                    <i className="fa fa-thumbs-up"></i>&nbsp;Completed</Button>
                  </ButtonGroup>

                  
                </ButtonToolbar>
        </Col>
      </Row>

      <Row style={{marginTop:60}}>

    <Label for="exampleText" sm={2}>Notes</Label>

      <Col sm={7}>
          <Input type="textarea" name="text" id="exampleText" />
        </Col>
        <Col sm={{ size: 2, offset: 1 }}>
          <Button>Submit</Button>
        </Col>
      </Row>
 

          </div>
        </div>  
      </div>
        )
    }
}

export default withRouter(ongoing);