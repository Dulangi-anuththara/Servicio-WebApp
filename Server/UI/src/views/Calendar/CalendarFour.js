import React, { Component } from 'react';
import Calendar from 'react-calendar';
 
class CalendarFour extends Component {
  state = {
    date: new Date(),
  }
 
  onChange = (date) =>{
    var booking = prompt("Create a new event:", "Event 1");
  }
 
  render() {
    return (
      <div>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
          height={500}
          ref={component => {
            this.calendar = component && component.control;
          }}
        />
      </div>
    );
  }
}

export default CalendarFour;