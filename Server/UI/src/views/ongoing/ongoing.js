import React, { Component } from 'react';
import { Card,CardText, CardHeader, Col, Row, Button, Input, Label, ButtonToolbar,ButtonGroup} from 'reactstrap';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {Launcher} from 'react-chat-window'
import axios from 'axios' ;
import {
  BrowserRouter as Router,
  withRouter,
} from "react-router-dom";



class ongoing extends Component {
    constructor(props){
        super(props)

        this.handleProgress = this.handleProgress.bind(this);
        this.handleNotes = this.handleNotes.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state={
            id:"",
            progress:0,
            progressStage:0,
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
            pathColor:"",
            State:"",
            note:"",
            notes:["Test"],
            messageList: []

        }
        console.log(this.props.match.params.id);

        const url=`http://localhost:5000/ongoing/doc/${this.props.uid}/${this.props.match.params.id}`
        axios.get(url)
        .then(response =>{

          //console.log(response.data);
          this.setState({
            id:response.data.id,
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
            progress:response.data.progress,   
            progressStage:response.data.progressStage,
            State:response.data.status,
            notes:response.data.notes,
            pathColor:response.data.pathColor
          },()=>{
            const URL =`http://localhost:5000/msg/${this.state.CustId}/${this.props.uid}`
            axios.get(URL)
            .then(response=>{
              console.log(response.data)
              this.setState({
                messageList:response.data
              })
            })


          })


        })
    }

handleProgress(value){

      var temp=""
      var val =0
      var color=""

  let PromiseName = new Promise((resolve,reject)=>{

    console.log(value)
    if(value==5){
      temp="Vehicle Accepted"
      val=1
      color="#FF1D15"
      resolve("Done");
             
    }
    else if(value == 20){
      temp="Process Started"
      val=2
      color="#2D7DD2"
      resolve("Done");
    }
    else if(value == 80){
      temp="Service Finished"
      val=3
      color="#E3B505"
      resolve("Done");
    }
    else if(value == 95){
      temp="Ready to pickup"
      val=4
      color="#F45D01"
      resolve("Done");
    }
    else if(value == 100){
      temp="Picked Up"
      val=5
      color="#97CC04"
      resolve("Done");
    }
    else{
      temp="Completed"
      val=6
      color="#FF1D15"
      resolve("Done");
    }

  })

    PromiseName.then(
      
      this.setState({
        progress:value,
        State:temp,
        progressStage:val,
        pathColor:color
      },()=>{
        console.log(this.state.State);
        var data ={
          status:this.state.State,
          progress:this.state.progress,
          progressStage:this.state.progressStage,
          id:this.state.CustId,
          pathColor:this.state.pathColor
        }
        const url=`http://localhost:5000/ongoing/stateUpdate/${this.props.uid}/${this.state.id}`
       
        axios.post(url,data)
        .then(response =>{
          console.log(response.data);
          if(this.state.progressStage==5){
            this.props.history.push('/done')
          }
        })  
    })
    )


}

  handleNotes(e){

    this.setState({
      [e.target.name]:e.target.value
    },()=>{

    })
    console.log(this.state.note)
  }

  handleSubmit(e){
    var arr = this.state.notes;
    arr.push(this.state.State +" : " + this.state.note);
    this.setState({
      notes:arr,
      note:""
    },()=>{
      const url=`http://localhost:5000/ongoing/addNotes/${this.props.uid}/${this.state.id}`
      var data ={
        notes:this.state.notes
      }
      axios.post(url,data)
      .then(response =>{
        console.log(response.data);
      })
      
    })    
  }

  _onMessageWasSent(message) {
    console.log(message);
    this.setState({
      messageList: [...this.state.messageList, message]
    })
    const url=`http://localhost:5000/msg/add/${this.state.CustId}/${this.props.uid}`
    axios.post(url,message)
    .then(response=>{
      console.log(response.data);
    })
  }
    render() {
        return (
    <div className="animated fadeIn">  
        <div className="card">          
          <div className="card-body">            
 
        <Row height={200}>
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
                <CardHeader tag="h4">Notes</CardHeader>
                
                {this.state.notes.map(item =>(
                  <div>
                     <p>{item}</p>
                  </div>
                 
                ))}
                </Card>
        
        </Col>
      </Row>
      <Row style={{marginTop:50}}>
        <Col sm="12" md={{ size: 12, offset: 1 }}>
        <ButtonToolbar>
                  <ButtonGroup className="mr-2">
                    <Button style={{backgroundColor:"#FF1D15",borderWidth:0,color:'white'}} size="lg" value={5} onClick={() => this.handleProgress(5)}>
                    <i className="fa fa-car"></i>&nbsp;Vehicle Arrived</Button>
                  </ButtonGroup>
                  <ButtonGroup className="mr-2">
                    <Button style={{backgroundColor:"#2D7DD2",borderWidth:0,color:'white'}} value={20} size="lg" onClick={() => this.handleProgress(20)} >
                    <i className="fa fa-hourglass"></i>&nbsp;Started</Button>
                  </ButtonGroup>
                  <ButtonGroup className="mr-2">
                    <Button style={{backgroundColor:"#E3B505",borderWidth:0}} value={80} size="lg" onClick={() => this.handleProgress(80)}>
                    <i className="fa fa-check"></i>&nbsp;Finished</Button>
                  </ButtonGroup>
                  <ButtonGroup className="mr-2">
                    <Button style={{backgroundColor:"#F45D01",borderWidth:0}} value={95} size="lg" onClick={() => this.handleProgress(95)}>
                    <i className="fa fa-bell"></i>&nbsp;Ready to pickup</Button>
                  </ButtonGroup>
                  <ButtonGroup className="mr-2">
                    <Button style={{backgroundColor:"#97CC04",borderWidth:0}} value={100} size="lg" onClick={() => this.handleProgress(100)}>
                    <i className="fa fa-bell"></i>&nbsp;Picked Up</Button>
                  </ButtonGroup>                 
                </ButtonToolbar>


        </Col>
      </Row>

      <Row style={{marginTop:60}}>

      <Label for="exampleText" sm={2}>Notes</Label>

      <Col sm={7}>
          <Input type="textarea" name="note" id="exampleText" value={this.state.note} onChange={this.handleNotes} />
        </Col>
        <Col sm={{ size: 2, offset: 0}}>
          <Button onClick={this.handleSubmit}>Submit</Button>
        </Col>
      </Row>

      
      <Launcher
                agentProfile={{
                teamName: this.state.CustName,
                imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
                }}
                onMessageWasSent={this._onMessageWasSent.bind(this)}
                messageList={this.state.messageList}
                showEmoji
                />
 

          </div>
        </div>  
      </div>
        )
    }
}

export default withRouter(ongoing);