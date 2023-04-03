import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import { DateSelectArg, EventClickArg, EventContentArg } from '@fullcalendar/core';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';

const App = () => {
    let id = 0;

    const createEventId = () => {
        return String(id++)
    }
    const [initialEvents, setInitialEvents] = useState([
        {
            id: createEventId(),
			title: 'Trip to Dolomites',
			start: '2023-04-06',
			end: '2023-04-10',
			color: "#eff5f9",
            backgroundColor: '#ffe1b9',
            textColor: '#77340c',
            expandRows: '3',
            eventMinHeight: '20px',
            displayEventEnd: true,
        },
        {
            id: createEventId(),
			title: 'Submit an interview assignment',
			start: '2023-04-10',
			color: "#eff5f9",
            backgroundColor: '#cfefa9',
            textColor: '#5f8fa1',
            allDay: false
        }
    ])
    console.log(initialEvents)
    const renderEventContent=(eventContent:EventContentArg) => {
        return(
            <>
            <b> {eventContent.timeText}</b>
            <b>{eventContent.event.title}</b>
            </>
        )
    }
    // const handleEventClick = (clickInfo:EventClickArg) => {
    //     alert(`you clicked ${clickInfo.event.title}`)
    //     console.log(...initialEvents)
    // }

    const handleDataSelect = (selectInfo:DateSelectArg) => {
        let title = prompt('Add new event');
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

    const handleEventClick = (clickInfo) => {
        let text = `Are you sure you want to delete the event '${clickInfo.event.title}'`
    if (window.confirm(text)){
      clickInfo.event.remove()
    }

    const handleDateSelect = (selectInfo) => {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: id++,
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }
  }
  return (
    <>
      <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrap5Plugin,]}
      themeSystem='bootstrap5'
      timeZone='UTC'
      headerToolbar={{
        left:"prev, next today",
        center: "title",
        right:"dayGridMonth, timeGridWeek, timeGridDay"
      }}
      initialView="dayGridMonth"
      selectMirror={true}
      dayMaxEvents={true}
      initialEvents={initialEvents}
      eventBackgroundColor='#d5d5fd'
      eventTextColor='#493696'
      eventBorderColor='#d5d5fd'
      eventDisplay='block'
      editable={true}
      selectable={true}
      locale={'cs'}
      firstDay={1}
      dateClick={(e: DateClickArg) => {
        console.log('dateclick', e)
      }}
      eventContent={renderEventContent}
      select={handleDataSelect}
      eventClick={handleEventClick}
      />
    </>
  );
}

export default App;
