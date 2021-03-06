import React, {Component} from 'react';
import { Label } from 'reactstrap'
import { withRouter, Redirect } from 'react-router-dom';
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "daypilot-pro-react";
import { Modal } from '@daypilot/modal';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import "./CalendarStyles.css";
import Axios from 'axios';

const styles = {
  left: {
    float: "left",
    width: "220px"
  },
  main: {
    marginLeft: "220px"
  }
};

class Calendar extends Component {

  constructor(props) {
    super(props);
    //let dp = this.calendar;
    //dp.dayBeginsHour = 9,
    this.state = {
      data:[],
      checking: false,
      viewType: "Day",
      durationBarVisible: false,
      cellWidth:80,
      timeRangeSelectedHandling: "Enabled",
      dayBeginsHour : 9,
      dayEndsHour:18,
      // onTimeRangeSelected: args => {
      //   var form = [
      //     {name: "Name", id: "name"}
      //   ];
        
      //   let dp = this.calendar;
      //  Modal.form(form).then(function(modal) {
      //     var data ={
      //       start:args.start,
      //       end:args.end,
      //       id:DayPilot.guid(),
      //       text:modal.result.name
      //     }
      //     dp.clearSelection();
      //     if (!modal.result.name) { return; }
      //     dp.events.add(new DayPilot.Event(data));

      //     const url ="http://localhost:5000/event/add"
      //     Axios.post(url,data).then((response)=>{
      //       console.log(response.data);

      //     })
      //   });
      // },
      eventDoubleClickHandling:"Enabled",
      onEventDoubleClick: args =>{
        console.log(args.e.data.id);
        if(args.e.tag("category") == 0){
        confirmAlert({
          message: 'Would you like to start the process?',
          buttons: [
            {
              label: 'Yes',
              onClick: () =>{
              console.log("Accepted")
               var url= `http://localhost:5000/ongoing/add/${this.props.uid}/${args.e.data.id}`
                Axios.post(url)
                .then((response)=>{
                  console.log(response);     
                  var url= `http://localhost:5000/event/changeColor/${this.props.uid}/${args.e.data.id}`
                  Axios.post(url)
                  .then(response=>{

                  })             
                })
                .then(()=>{
                this.props.history.push('/InProgress');
                  //return <Redirect to="/InProgress" />
                })
            
            
            },             

            },
            {
              label: 'No',
              onClick: () => alert('Click No')
            }
          ]
        });
      }
      else{
        alert("Process has already started")
      }
      },
      eventDeleteHandling: "Update",
      onEventClick: args => {
        let dp = this.calendar;
        DayPilot.Modal.prompt("Would You Like To go to Process?", args.e.text()).then(function(modal) {
          if (!modal.result) { return; }
          args.e.data.text = modal.result;
          dp.events.update(args.e);
        });
      },
      checkAvailabilty:() => console.log(this.props.location)

    };

    
    
    
  }

  componentDidMount() {
    console.log("Here");
    const url =`http://localhost:5000/event/${this.props.uid}`
    Axios.get(url).then(res =>{

     /* res.data.forEach(element => {
        element.start = element.start.slice(0,19);
        element.end = element.end.slice(0,19);
      });*/
      
     this.setState({
        data:res.data
      },() => {
        console.log(this.state.data);
        this.setState({
          events:this.state.data
        },()=> console.log(this.state.events))
      })
    })

    

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    //console.log(today);
    this.setState({
      startDate: today,
    });
  }

  render() {
    
    var {...config} = this.state;
    return (
      <div>

        <div style={styles.main}>
        <DayPilotCalendar
          {...config}
          ref={component => {
            this.calendar = component && component.control;
          }}
        />
        </div>
      </div>
    );
  }
}

export default withRouter(Calendar);
