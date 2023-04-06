import React, { FormEvent, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  EventInput,
} from "@fullcalendar/core";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import { ModalComponent, MyFormData } from "./components/ModalComponent";

const App = () => {
  let id = 0;
  let themeOptions: object;
  const createEventId = () => {
    return String(id++);
  };
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState<MyFormData>();
  const [events, setEvents] = useState<EventInput[]>([
    {
      id: createEventId(),
      title: "Trip to Dolomites",
      start: "2023-04-06",
      end: "2023-04-10",
      color: "#eff5f9",
      backgroundColor: "#ffe1b9",
      textColor: "#77340c",
      expandRows: "3",
      eventMinHeight: "20px",
      displayEventEnd: true,
    },
    {
      id: createEventId(),
      title: "Easter",
      start: "2023-04-10",
      end: "2023-04-10",
      color: "#eff5f9",
      backgroundColor: "#ffe1b9",
      textColor: "#77340c",
      expandRows: "3",
      eventMinHeight: "20px",
      displayEventEnd: true,
    },
    {
      id: createEventId(),
      title: "Submit an interview assignment",
      start: "2023-04-10",
      color: "#eff5f9",
      backgroundColor: "#cfefa9",
      textColor: "#5f8fa1",
      allDay: false,
    },
    {
      id: createEventId(),
      title: "React academy",
      start: "2023-04-25",
      startRecur: "2023-04-25",
      endRecur: "2023-05-05",
      color: "#eff5f9",
      backgroundColor: "#cfefa9",
      textColor: "#5f8fa1",
      daysOfWeek: [2, 4],
      startTime: "18:00",
      endTime: "21:00",
      groupId: "12",
    },
    {
      id: createEventId(),
      title: "Baby sitting",
      start: "2023-04-15",
      end: "2023-04-17",
      color: "#493696",
      backgroundColor: "#d5d5fd",
      textColor: "#493696",
      borderColor: "#d5d5fd",
      allDay: false,
    },
    {
      id: createEventId(),
      title: "ReactGirls Meetup",
      start: "2023-04-20",
      color: "#eff5f9",
      backgroundColor: "#ffe1b9",
      textColor: "#77340c",
      allDay: false,
    },
  ]);

  const handleNewEvent = (event: EventInput) => {
    setEvents([...events, event]);
  };

  const renderEventContent = (eventContent: EventContentArg) => {
    return (
      <>
        <b>{eventContent.event.title}</b>
        <br />
        <span> {eventContent.timeText}</span>
      </>
    );
  };

  const addNewEvent = (selectInfo: DateSelectArg,  e: FormEvent<HTMLFormElement>) => {
    setShowModal(() => !showModal);
    console.log(data)
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    console.log(selectInfo)
    if(data?.priority === 'high') {
      themeOptions = {
        color: "#77340c",
        backgroundColor: "#ffe1b9",
        textColor: "#77340c",
      }
    }
    calendarApi.addEvent({
      id: String(id++),
      title: data?.title,
      start: selectInfo.startStr,
      ...themeOptions,
    });
  };

  const removeEvent = (clickInfo: EventClickArg) => {
    console.log(clickInfo.event.id)
    if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'?`)) {
      const eventId = clickInfo.event.title;
      const updatedEvents = events.filter((event) => event.title !== eventId);
      setEvents(updatedEvents);
    }
  }
    
  return (
    <>
      <FullCalendar
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          bootstrap5Plugin,
        ]}
        themeSystem="bootstrap5"
        timeZone="UTC"
        headerToolbar={{
          left: "prev, next, today",
          center: "title",
          right: "dayGridMonth, timeGridWeek, timeGridDay",
        }}
        buttonText={{
          prev: "prev",
          next: "next",
        }}
        initialView="dayGridMonth"
        selectMirror={true}
        dayMaxEvents={true}
        events={events}
        eventBackgroundColor="#d5d5fd"
        eventTextColor="#493696"
        eventBorderColor="#d5d5fd"
        eventDisplay="block"
        editable={true}
        selectable={true}
        locale={"cs"}
        firstDay={1}
        eventContent={renderEventContent}
        eventClick={removeEvent}
        select={() => setShowModal(() => !showModal)}
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          // second: '2-digit',
          meridiem: false,
        }}
      />
      {showModal && (
        <ModalComponent
          show={showModal}
          setData={setData}
          onHide={() => setShowModal(false)}
          onSubmit={addNewEvent}
          setEvents={setEvents}
          handleNewEvent={handleNewEvent}
          events={events}
        />
      )}
    </>
  );
};

export default App;
