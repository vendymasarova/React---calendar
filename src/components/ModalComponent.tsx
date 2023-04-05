import React from 'react';
import { EventInput } from '@fullcalendar/core';
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
    // setEvents(events && Array.isArray(events) ? [...events, newEvent] : [newEvent]);
  };

  return (
    <div>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {/* <form ref={form} onSubmit={onSubmit}>
                <input type="text" name='title' />
                <input type="datepicker" name='start' />
                <input type="datepicker" name='end' />
                <button type='submit' onClick={submit}>
                    Save Changes
                </button>
            </form> */}
            <Form ref={form} onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter title" name='title'/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text" placeholder="Enter start date in format DDDD-MM-DD" name='start' />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text" placeholder="Enter end date in format DDDD-MM-DD" name='end' />
                </Form.Group>
                <div className="form-froup">
                    <label >Low priority</label>
                    <input type="radio" name='priority' value='low' />
                </div>
                <div className="form-froup">
                    <label >Medium priority</label>
                    <input type="radio" name='priority' value='medium' />
                </div>
                <div className="form-froup">
                    <label >High priority</label>
                    <input type="radio" name='priority' value='high' />
                </div>
                <Button variant="primary" type="submit" onClick={submit}>
                    Submit
                </Button>
            </Form>
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