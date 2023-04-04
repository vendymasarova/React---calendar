import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import {
  DateSelectArg,
  EventContentArg,
  EventInput,
} from "@fullcalendar/core";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import { ModalComponent, MyFormData } from "./components/ModalComponent";
import { formatDiagnosticsWithColorAndContext } from "typescript";

const App = () => {
  let id = 0;
  let themeOptions: object;
  const createEventId = () => {
    return String(id++);
  };
  const [initialEvents, setInitialEvents] = useState([
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
      endRecud: "2023-05-04",
      end: "2023-05-04",
      color: "#eff5f9",
      backgroundColor: "#cfefa9",
      textColor: "#5f8fa1",
      daysOfWeek: [2, 4],
      startTime: "18:00",
      endTime: "21:00",
      allDay: false,
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
      endRecud: "2023-05-04",
      end: "2023-05-04",
      color: "#eff5f9",
      backgroundColor: "#cfefa9",
      textColor: "#5f8fa1",
      daysOfWeek: [2, 4],
      startTime: "18:00",
      endTime: "21:00",
      allDay: false,
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
  console.log(events);

  const handleData = (formData: MyFormData) => {
    console.log(formData);
    setData(() => formData);
  };

  console.log(data);

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

  const handleDataSelect = (selectInfo: DateSelectArg) => {
    setShowModal(() => !showModal);

    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    calendarApi.addEvent({
      id: String(id++),
      title: data?.title,
      start: selectInfo.startStr,
      ...themeOptions,
    });
  };

  console.log(data);

  const handleEventClick = (clickInfo) => {
    let text = `Are you sure you want to delete the event '${clickInfo.event.title}'`;
    if (window.confirm(text)) {
      clickInfo.event.remove();
    }

    const handleDateSelect = (selectInfo) => {
      let title = prompt("Please enter a new title for your event");
      let start = prompt(
        "Please enter a start date in this format: DDDD-MM-DD"
      );
      let end = prompt("Please enter a end date in this format: DDDD-MM-DD");
      let calendarApi = selectInfo.view.calendar;

      calendarApi.unselect(); // clear date selection
      if (title && start && end) {
        calendarApi.addEvent({
          id: id++,
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
        });
      }
    };
  };
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
        eventClick={handleEventClick}
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
          setData={handleData}
          onHide={() => setShowModal(false)}
          onSubmit={handleDataSelect}
          setEvents={setEvents}
          handleNewEvent={handleNewEvent}
        />
      )}
    </>
  );
};

export default App;
