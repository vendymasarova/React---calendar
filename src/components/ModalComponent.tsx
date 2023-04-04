import React from 'react';
import { EventInput } from '@fullcalendar/core';
import Modal from 'react-bootstrap/Modal';

export interface MyFormData {
  title?: string;
  start?: string;
  end?: string;
}

export interface ModalProps {
  show: boolean;
  onHide: () => void;
  setData: (data: MyFormData) => void;
  setEvents:(events: EventInput[]) => void;
  onSubmit: () => void;
  events: MyFormData[];
  handleNewEvent: (newEvent: EventInput) => void;
}

export const ModalComponent = ({show, onHide, setData, onSubmit, handleNewEvent}: ModalProps) => {
    const form = React.useRef<undefined | HTMLFormElement | undefined>(null)

  const submit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const data = new FormData(form.current as HTMLFormElement);
    const formData: MyFormData = {
      title: data.get('title') as string,
      start: data.get('start') as string,
      end: data.get('end') as string,
    };
    const newEvent: EventInput = {
        title: formData.title,
        start: formData.start,
        end: formData.end,
    };
    setData(formData)
    handleNewEvent(newEvent);
    // setEvents(events && Array.isArray(events) ? [...events, newEvent] : [newEvent]);
  };

  return (
    <div>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form ref={form} onSubmit={onSubmit}>
                <input type="text" name='title' />
                <input type="datepicker" name='start' />
                <input type="datepicker" name='end' />
                <button type='submit' onClick={submit}>
                    Save Changes
                </button>
            </form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={onHide}>
            Close
          </button>
          
        </Modal.Footer>
      </Modal>
    </div>
  );
}

// export default Modal;