import React, {Component} from 'react';
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "daypilot-pro-react";
import { Modal } from '@daypilot/modal';
import "./CalendarStyles.css";

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
    this.state = {
      viewType: "Week",
      durationBarVisible: false,
      cellWidth:80,
      timeRangeSelectedHandling: "Enabled",
      onTimeRangeSelected: args => {
        var form = [
          {name: "Name", id: "name"}
        ];
        let dp = this.calendar;
       Modal.form(form).then(function(modal) {
          console.log(modal);
          dp.clearSelection();
          if (!modal.result.name) { return; }
          dp.events.add(new DayPilot.Event({
            start: args.start,
            end: args.end,
            id: DayPilot.guid(),
            text: modal.result.name
          }));
        });
      },
      eventDeleteHandling: "Update",
      onEventClick: args => {
        let dp = this.calendar;
        DayPilot.Modal.prompt("Update event text:", args.e.text()).then(function(modal) {
          if (!modal.result) { return; }
          args.e.data.text = modal.result;
          dp.events.update(args.e);
        });
      },
    };
  }

  componentDidMount() {

    // load event data
    this.setState({
      startDate: "2019-09-15",
      events: [
        {
          id: 1,
          text: "Event 1",
          start: "2019-09-16T10:30:00",
          end: "2019-09-16T13:00:00"
        },
        {
          id: 2,
          text: "Event 2",
          start: "2019-09-17T12:00:00",
          end: "2019-09-17T14:00:00",
          backColor: "#38761d"
        }
      ]
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
