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
    let themeOptions:object;
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
			title: 'Easter',
			start: '2023-04-10',
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
        },
        {
            id: createEventId(),
			title: 'React academy',
			start: '2023-04-25',
            startRecur: '2023-04-25',
            endRecud: '2023-05-04', 
            end: '2023-05-04',
			color: "#eff5f9",
            backgroundColor: '#cfefa9',
            textColor: '#5f8fa1',
            daysOfWeek: [2, 4],
            startTime: '18:00',
            endTime: '21:00',
            allDay: false,
            groupId: '12',
        },
        {
            id: createEventId(),
			title: 'Baby sitting',
			start: '2023-04-15',
			end: '2023-04-17',
			color: "#493696",
            backgroundColor: '#d5d5fd',
            textColor: '#493696',
            borderColor: '#d5d5fd',
            allDay: false
        },
        {
            id: createEventId(),
			title: 'ReactGirls Meetup',
			start: '2023-04-20',
			color: "#eff5f9",
            backgroundColor: '#ffe1b9',
            textColor: '#77340c',
            allDay: false
        }
    ])

    const renderEventContent=(eventContent:EventContentArg) => {
        return(
            <>
            <b>{eventContent.event.title}</b>
            <br />
            <span> {eventContent.timeText}</span>
            </>
        )
    }
    // const handleEventClick = (clickInfo:EventClickArg) => {
    //     alert(`you clicked ${clickInfo.event.title}`)
    //     console.log(...initialEvents)
    // }

    const handleDataSelect = (selectInfo:DateSelectArg) => {
        let title = prompt('Add new event');
        let end = prompt('Please enter a end date in this format: DDDD-MM-DD')
        let priority = prompt('choose priority, options: high, medium, low');
        console.log(priority);
        
        if (priority === 'high') {
            themeOptions = {
                color: "#eff5f9",
                backgroundColor: '#cfefa9',
                textColor: '#5f8fa1',
            }
        }
        if (priority === 'medium') {
            themeOptions = {
                color: "#493696",
                backgroundColor: '#d5d5fd',
                textColor: '#493696',
            }
        }
        if (priority === 'low') {
            themeOptions = {
                color: "#eff5f9",
                backgroundColor: '#ffe1b9',
                textColor: '#77340c',
            }
        }
        let calendarApi = selectInfo.view.calendar
        calendarApi.unselect();
        if(title && end) {
            calendarApi.addEvent( {
                id: String(id++),
                title,
                start: selectInfo.startStr,
                end,
                ...themeOptions,
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
        let start = prompt('Please enter a start date in this format: DDDD-MM-DD')
        let end = prompt('Please enter a end date in this format: DDDD-MM-DD')
        let calendarApi = selectInfo.view.calendar

        calendarApi.unselect() // clear date selection

        if (title && start && end) {
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
        left:"prev, next, today",
        center: "title",
        right:"dayGridMonth, timeGridWeek, timeGridDay"
      }}
      buttonText={{
        prev: 'prev',
        next: 'next'
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
      eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            // second: '2-digit',
            meridiem: false
        }}
    //   eventTimeFormat={'h:mm'}
      />
    </>
  );
}

export default App;
