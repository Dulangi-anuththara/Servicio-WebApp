import React, {Component} from 'react';
import {DayPilot, DayPilotCalendar, DayPilotScheduler} from "daypilot-pro-react";

class CalendarTwo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      startDate: "2020-02-02",
      viewType: "Day",
      cellHeight: 30,
      timeRangeSelectedHandling: "Enabled",
      onTimeRangeSelected: function (args) {
        DayPilot.Modal.prompt("Create a new event:", "Event 1").then(function(modal) {
          var dp = args.control;
          dp.clearSelection();
          if (!modal.result) { return; }
          dp.events.add(new DayPilot.Event({
            start: args.start,
            end: args.end,
            id: DayPilot.guid(),
            text: modal.result
          }));
        });
      },
      onBeforeEventRender: args => {
        args.data.backColor = "#93c47d";
        args.data.barHidden = true;
        args.data.fontColor = "black";
        args.data.borderColor = "darker";

        args.data.areas = [
          {right: 6, top: 6, width: 17, height: 10, image: "info-17-inverted-rounded-semi.svg", onClick: args=> this.showDetails(args.source)},
          ];
      },
      onBeforeEventDomAdd: args => {
        args.element = <div>
          {args.e.data.text}
          <div style={{position: "absolute", right: "25px", top: "5px", height: "10px", width: "17px"}}
               onClick={()=>this.showDetails(args.e)}>
            <img src={"info-17-semi.svg"} alt={"Info icon"}/>
          </div>
        </div>;
      }
    };
  }

  showDetails(e) {
   DayPilot.Modal.alert(e.data.text);
  }

  componentDidMount() {

    // load resource and event data
    this.setState({
      startDate: DayPilot.Date.today(),
      events: [
        {
          id: 1,
          text: "Event 1",
          start: DayPilot.Date.today().addHours(10),
          end: DayPilot.Date.today().addHours(14)
        },
        {
          id: 2,
          text: "Event 2",
          start: "2020-02-02T10:00:00",
          end: "2020-02-02T11:00:00",
          barColor: "#38761d",
          barBackColor: "#93c47d"
        }
      ]
    });

  }

  render() {
    var {...config} = this.state;
    return (
      <div>
        <DayPilotCalendar
          {...config}
          ref={component => {
            this.calendar = component && component.control;
          }}
          cellHeight={20}
        />
      </div>
    );
  }
}

export default CalendarTwo;
