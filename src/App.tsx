import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import { Popover } from "bootstrap";
import { DateSelectArg, EventClickArg, EventContentArg } from '@fullcalendar/core';

const App = () => {
    let id = 0;
    const [initialEvents, setInitialEvents] = useState([
        {
            id: String(1),
			title: 'Trip to Dolomites',
			start: '2023-04-06',
			end: '2023-04-10',
			color: "#eff5f9",
        }
    ])
    const renderEventContent=(eventContent:EventContentArg) => {
        return(
            <>
            <b> {eventContent.timeText}</b>
            <b>{eventContent.event.title}</b>
            </>
        )
    }
    const handleEventClick = (clickInfo:EventClickArg) => {
        alert(`you clicked ${clickInfo.event.title}`)
        console.log(...initialEvents)
    }

    const handleDataSelect = (selectInfo:DateSelectArg) => {
        let title = prompt('Event sdfs');
        let calendarApi = selectInfo.view.calendar
        calendarApi.unselect();
        if(title) {
            calendarApi.addEvent( {
                id: String(id++),
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay
            })
        }
    }
  return (
    <>
      <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        left:"prev, next today",
        center: "title",
        right:"dayGridMonth, timeGridWeek, timeGridDay"
      }}
      dayMaxEvents={true}
      initialView="dayGridMonth"
      eventContent={renderEventContent}
      initialEvents={initialEvents}
      events={initialEvents}
      editable={true}
      selectable={true}
      locale={'cs'}
      firstDay={1}
      dateClick={(e: DateClickArg) => {
        console.log('dateclick', e)
      }}
      select={handleDataSelect}
      eventClick={handleEventClick}
      eventDidMount={(info) => {
        return new Popover(info.el, {
            placement: "auto",
            trigger: "hover",
            customClass: "popoverStyle",
            html: true,
            content: "<p>Hello</p>"
            }      
        )
      }}
      />
    </>
  );
}

export default App;
