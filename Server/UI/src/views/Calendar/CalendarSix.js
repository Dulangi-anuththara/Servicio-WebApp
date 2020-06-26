
import React, {Component} from 'react';
import {DayPilotCalendar, DayPilotNavigator} from "daypilot-pro-react";


const styles = {
    left: {
      float: "left",
      width: "220px"
    },
    main: {
      marginLeft: "220px"
    }
  };

class CalendarSix extends Component {
    constructor(props) {
        super(props);
       
      }
    
    render() {
       // var {...config} = this.state;
        return (

            <div>
                <div style={styles.left}>
            <DayPilotNavigator
                selectMode={"week"}
                showMonths={3}
                skipMonths={3}
                onTimeRangeSelected={ args => {
                    console.log(args.start);
                this.setState({
                    startDate: args.day
                });
                }}
            />
            </div>

            </div>
        );
    }
}

export default CalendarSix;