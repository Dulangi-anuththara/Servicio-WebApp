import React, {Component} from 'react';
import {DayPilot, DayPilotScheduler} from "daypilot-pro-react";

class CalendarFive extends Component {
    constructor(props){
        super(props);

        this.state={
            
        }
    }


    render() {
        var days =DayPilot.Date.today().daysInMonth();
        var array = []
        for(var i=0;i<days;i++){
            array[i]={
                name: i+1,
                id:i+1
            }
        }

        return (
            <DayPilotScheduler
                startDate={DayPilot.Date.today()} 
                cellDuration={30}
                timeHeaders={[
                   // {"groupBy": "Default"},
                    {"groupBy": "Hour"},
                    {"groupBy": "Cell"},

                ]}

                resources = {array}
                events={ [
                    {id: 1, text: "Event 1", start: "2020-06-26T01:00:00", end: "2020-06-26T02:30:00", resource:6 },
                    {id: 2, text: "Event 2", start: "2019-10-03T00:00:00", end: "2019-10-10T00:00:00", resource: "C", barColor: "#38761d", barBackColor: "#93c47d" },
                    {id: 3, text: "Event 3", start: "2019-10-02T00:00:00", end: "2019-10-08T00:00:00", resource: "D", barColor: "#f1c232", barBackColor: "#f1c232" },
                    {id: 4, text: "Event 3", start: "2019-10-02T00:00:00", end: "2019-10-08T00:00:00", resource: "E", barColor: "#cc0000", barBackColor: "#ea9999" }
                ]}

            
            />
        );
    }
}

export default CalendarFive;