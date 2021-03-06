import React, {Component} from 'react';
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "daypilot-pro-react";
import { Modal } from '@daypilot/modal';
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
      viewType: "Week",

      durationBarVisible: false,
      cellWidth:80,
      timeRangeSelectedHandling: "Enabled",
      dayBeginsHour : 9,
      dayEndsHour:18,
      eventMoveHandling:'Disabled',
      contextMenu: new DayPilot.Menu({
        items:[
          {
            text: "Delete",
            icon:"icon-close icons",
            onClick: args => {

              DayPilot.Modal.confirm("Are you sure you want to delete this?").then((result)=>{
                if(result.result){
                  var e = args.source;
                  console.log(args.source.data.id)
                  this.calendar.events.remove(e);
                  const url =`http://localhost:5000/event/delete/${props.uid}/${args.source.data.id}`
                  Axios.post(url).then((response)=>{
                    console.log(response);        
                  })
                }
              })
            }
          },
          {
            text: "Update",
            icon:"icon-pencil icons",
            onClick: args =>{
              console.log(args.source.data.text)
              let dp = this.calendar;
              let e = args.source
              DayPilot.Modal.prompt("Update event text:", args.source.data.text).then(function(modal) {
                if (!modal.result) { return; }
                e.data.text = modal.result;
                dp.events.update(e);
                const url =`http://localhost:5000/event/update/${props.uid}/${args.source.data.id}`
                Axios.post(url,{text:modal.result})
               .then((response)=>{
                  console.log(response.data);    
              })
            });

            }
          }
              ]
    }),
      onTimeRangeSelected: args => {
        var form = [
          {name: "Name", id: "name"},
          {name:"Service Type", id:"service"}
        ];
        
        let dp = this.calendar;
        let today = new Date(args.start.value)
        let todayTime = new Date();
        
        if(today<todayTime){
          console.log("Date has passed");
          DayPilot.Modal.alert("Please note that you cannot make reservations for old dates.");
        }
        else{
          Modal.form(form).then(function(modal) {
            var data ={
              start:args.start,
              end:args.end,
              id:DayPilot.guid(),
              text:modal.result.name+ " " +modal.result.service,
              backColor:'#ffc107'
            }
            dp.clearSelection();
            if (!modal.result.name) { return; }
            dp.events.add(new DayPilot.Event(data));
  
            const url =`http://localhost:5000/event/addMan/${props.uid}`
            Axios.post(url,data).then((response)=>{
              console.log(response.data);
  
            })
          });
        }

      },
      eventDeleteHandling: "Update",

    /*  onEventClick: args => {
        let dp = this.calendar;
        DayPilot.Modal.prompt("Update event text:", args.e.text()).then(function(modal) {
          if (!modal.result) { return; }
          args.e.data.text = modal.result;
          dp.events.update(args.e);
        });
      },*/
      checkAvailabilty:() => console.log(this.props.location),

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
        })
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
        <div style={styles.left}>
          <DayPilotNavigator
            selectMode={"week"}
            showMonths={3}
            skipMonths={3}
            onTimeRangeSelected={ args => {
              this.setState({
                startDate: args.day
              });
            }}
          />
        </div>
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

export default Calendar;
