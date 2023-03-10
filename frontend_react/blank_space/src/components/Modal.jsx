import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const MyModal = (props) => {
  return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            {props.heading}
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {props.children}
        </Modal.Body>
        <Modal.Footer>
            {/* <Button onClick={props.reset} variant="warning">Reset</Button> */}
            <Button onClick={props.onSubmit}>Submit</Button>
            <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
    </Modal>
  )
}

export default MyModal;