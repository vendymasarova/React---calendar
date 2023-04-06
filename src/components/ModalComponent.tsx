import React, { FormEvent, FormEventHandler, MouseEventHandler } from 'react';
import { DateSelectArg, EventInput } from '@fullcalendar/core';
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';

export interface MyFormData {
  title?: string;
  start?: string;
  end?: string;
  priority?: string;
}

export interface ModalProps {
  show: boolean;
  onHide: () => void;
  setData: (data: MyFormData) => void;
  setEvents:(events: EventInput[]) => void;
  onSubmit: (selectInfo: DateSelectArg, e: FormEvent<HTMLFormElement>) => void;
  events: EventInput[];
  handleNewEvent: (newEvent: EventInput) => void;
}

export const ModalComponent = ({show, onHide, setData, onSubmit, handleNewEvent}: ModalProps) => {
  const form = React.useRef<HTMLFormElement>(null);
  const submit: MouseEventHandler<HTMLButtonElement> = (e): void => {
    e.preventDefault();
    const data = new FormData(form.current as HTMLFormElement);
    const formData: MyFormData = {
      title: data.get('title') as string,
      start: data.get('start') as string,
      end: data.get('end') as string,
      priority: data.get('priority') as string,
    };
    const newEvent: EventInput = {
        title: formData.title,
        start: formData.start,
        end: formData.end,
        priority: formData.priority,
    };
    setData(formData)
    handleNewEvent(newEvent);
  };

  return (
    <div>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add new event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form ref={form} onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Event name</Form.Label>
                    <Form.Control type="email" name='title'/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>From</Form.Label>
                    <Form.Control type="text" placeholder="Enter start date" name='start' />
                    <Form.Text className="text-muted">
                    format YYYY-MM-DD
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>To</Form.Label>
                    <Form.Control type="text" placeholder="Enter end date" name='end' />
                    <Form.Text className="text-muted">
                    format YYYY-MM-DD
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={submit}>
                    Submit
                </Button>
            </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

// export default Modal;