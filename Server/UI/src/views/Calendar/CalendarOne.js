import React, { Component } from 'react';
import AvailableTimes from 'react-available-times';
import {DayPilot, DayPilotCalendar} from "daypilot-pro-react";


class CalendarOne extends Component{

render() {

    return(
<AvailableTimes
  weekStartsOn="monday"
  calendars={[
    {
      id: 'work',
      title: 'Work',
      foregroundColor: '#ff00ff',
      backgroundColor: '#f0f0f0',
      selected: false,
    },
    {
      id: 'private',
      title: 'My private cal',
      foregroundColor: '#666',
      backgroundColor: '#f3f3f3',
    },
  ]}
  onChange={(selections) => {
    //var booking = prompt("Create a new event:", "Event 1");
   // console.log(selections.values(booking));
    //if(booking != null){
    selections.forEach(({ start, end ,values}) => {
      console.log('Start:', start, 'End:', end );
      //console.log(booking);

    }
    )//}
  }}
  onEventsRequested={({ calendarId, start, end, callback }) => {
    //loadMoreEvents(calendarId, start, end).then(callback);
  }}
 
 // initialSelections={[
  //  { start: aDateObject, end: anotherDateObject }
 // ]}
 
  height={800}
  recurring={false}
  availableDays={['monday', 'tuesday', 'wednesday', 'thursday', 'friday','saturday']}
  availableHourRange={{ start: 7, end: 19 }}
/>
    )}
}

export default CalendarOne;