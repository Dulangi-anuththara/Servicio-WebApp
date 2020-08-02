import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Collapse, Fade, Row, Table } from 'reactstrap';
import Axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {DayPilot} from "daypilot-pro-react";

class Requests extends Component {

  constructor(props) {
    super(props);
    this.onEntering = this.onEntering.bind(this);
    this.onEntered = this.onEntered.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.toggleCustom = this.toggleCustom.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.handleClickOpen=this.handleClickOpen.bind(this);
    this.handleClose=this.handleClose.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.checkAvailabilty=this.checkAvailabilty.bind(this);
    this.addEvent=this.addEvent.bind(this);
    this.state = {
      test:'',
      open:false,
      collapse: false,
      accordion: [true, false, false,false,false,false,false],
      custom: [true, false],
      status: 'Closed',
      fadeIn: true,
      timeout: 300,
      data : [],
      bookings:{},
      result:false,
      show:false,
    };

    const url= `http://localhost:5000/bookings/${props.uid}`;
    Axios.get(url).then(res => {
        
        /*res.data.forEach(element => {
          element.Date = element.Date.slice(0,16);
          element.EndDate = element.EndDate.slice(0,16);
        });*/
        console.log(res.data)
        this.setState({
        data:res.data,
        bookings:res.data[0]
      });
     
    })
    
    

  }

  onEntering() {
    this.setState({ status: 'Opening...' });
  }

  onEntered() {
    this.setState({ status: 'Opened' });
  }

  onExiting() {
    this.setState({ status: 'Closing...' });
  }

  onExited() {
    this.setState({ status: 'Closed' });
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleAccordion(tab) {
    console.log(tab);
    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => tab === index ? !x : false);

    this.setState({
      accordion: state,
      bookings:this.state.data[tab]
    });
  }

  toggleCustom(tab) {

    const prevState = this.state.custom;
    const state = prevState.map((x, index) => tab === index ? !x : false);

    this.setState({
      custom: state,
    });
  }

  toggleFade() {
    this.setState({ fadeIn: !this.state.fadeIn });
  }

  handleClickOpen(){
    this.setState({
      open:true
    })
  };

  handleClose(){

    this.setState({
      open:false,
      show:false,
    });
    
  }

  handleDate(e){
    var time = e.target.value;
    console.log(time);
   const bookings = { ...this.state.bookings, EndDate: time }
    this.setState(() => ({ bookings }),() => console.log(this.state.bookings));
  }

  checkAvailabilty(){
    this.setState({
      open:false
    });

    console.log(this.state.bookings);

    const data ={
      start:this.state.bookings.Date,
      end:this.state.bookings.EndDate
      //start:"2020-07-11T15:00",
      //end:"2020-07-11T16:00"
    }

    const url = `http://localhost:5000/bookings/checkAvailability/${this.props.uid}`
    Axios.post(url,data)
         .then( res => {
           console.log(res.data);
           if(res.data.events >5){

              this.setState({
                result:false,
                show:true
              })
           }
           else{
            this.setState({
              result:true,
              show:true
            })
           }
         })
    //console.log("going to check the availability");
  }

  componentWillUnmount(){
    
  }

  addEvent(){
    this.setState({
      show:false
    })

   /* var data ={
      id:DayPilot.guid(),
      start:this.state.bookings.Date,
      end:this.state.bookings.EndDate+":00",
      text:this.state.bookings.ServiceType + ' - ' + this.state.bookings.CustName + '/' + this.state.bookings.Vehicle
    }*/
    console.log("Add Request");
    var data = {
      id:DayPilot.guid(),
      bookings:this.state.bookings
    }

    const url =`http://localhost:5000/event/add/${this.props.uid}`
          Axios.post(url,data).then((response)=>{
            console.log(this.state.bookings.CustId)
            const info={
              bookingId:this.state.bookings.id,
              CustId:this.state.bookings.CustId
            }
            const path = `http://localhost:5000/bookings/edit/${this.props.uid}`
            Axios.post(path,info).then((response) =>{
              console.log(response.data);
              this.props.history.push('CalendarThree');
            })

          })

  }

  render() {

    let content=<div></div>

    if(this.state.result){
      content =<div> <DialogTitle id="form-dialog-title">Availability</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Requested time is available. Would you like to accept the request?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={this.addEvent} color="primary">
          Yes
        </Button>
        <Button onClick={this.handleClose} color="primary">
          NO
        </Button>
      </DialogActions></div>
    }else{
        
      content=<div> <DialogTitle id="form-dialog-title">Availability !</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Sorry! requested time is already reserved. Would you like to suggest new time?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={this.handleClose} color="primary">
          Yes
        </Button>
        <Button onClick={this.handleClose} color="primary">
          NO
        </Button>
      </DialogActions></div>
    }










    return (
      <div className="animated fadeIn">
        <Row>
          
          <Col xl="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> NEW <small>requests</small>
                <div className="card-header-actions">
                </div>
              </CardHeader>
              <CardBody>
              <div id="accordion">
                  {this.state.data.map((item,index) => 
                    <div key={index}>
                      <Card key={index} className="mb-0">
                      <CardHeader id="headingTwo">
                        <Button block color="#2f353a" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(index)} aria-expanded={this.state.accordion[1]} aria-controls="collapseTwo">
                        <h5 className="m-0 p-0"><i className="icon-plus"></i> {item.ServiceType} on {item.Date}</h5>
                          
                        </Button>
                      </CardHeader>
                      <Collapse isOpen={this.state.accordion[index]} data-parent="#accordion" id="collapseTwo">
                      <Row>
                        <CardBody>                          
                        <Table responsive>
                  <tbody>
                  <tr>
                  <td><Link to="/profile">{item.CustName}</Link> needs a {item.ServiceType} for a {item.VehicleType} on <Link to="/CalendarThree">{item.Date}</Link></td>
                  <td style={{width:100}}>
                        <Button  block color="info" size="lg" style={{width:200}} onClick={this.handleClickOpen}>Check Availability</Button></td>
                  <td style={{width:20}}>
                        <Button active block color="danger" aria-pressed="true" size="lg">Decline</Button></td>
                  </tr>
                  </tbody>
                </Table>  
                                                 
                          </CardBody></Row> 
                      </Collapse>
                    </Card>

                      <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>
                      <DialogTitle id="form-dialog-title">Check for Availability !</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          It would be ideal if you select expected completion time to carry out {this.state.bookings.ServiceType}
                        </DialogContentText>
                      <form >
                          <TextField
                            id="EndDate"
                            label="Estimated Finishing Time"
                            type="datetime-local"
                            onChange={this.handleDate}
                            defaultValue={this.state.bookings.EndDate}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </form>
   

                      </DialogContent>
                      <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                          Cancel
                        </Button>
                        <Button onClick={this.checkAvailabilty} color="primary">
                          Check
                        </Button>
                      </DialogActions>
                      </Dialog>

                      <Dialog open={this.state.show}>

                            {content}

                      </Dialog>
                   </div>                       
                )}
                
              </div>                  
                
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(Requests);
