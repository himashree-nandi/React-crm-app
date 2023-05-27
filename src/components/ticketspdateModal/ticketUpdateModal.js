import React from "react";
import { Button, Modal } from "react-bootstrap";

export default function TicketUpdateModal(props) {
  const {
    selectCurrentTickets,
    ticketUpdateModal,
    editTickets,
    closeModal,
    onChangeTickets,
    submitTickets,
  } = props;

  return (
    <Modal show={ticketUpdateModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>EDIT DETAILS</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={submitTickets}>
          <div className="card submit mb-2 ">
            <h6>Ticket Id:{selectCurrentTickets._id}</h6>
          </div>

          <div className="input-group mb-2">
            <span className="input-group-text">Title </span>
            <input
              className="form-control"
              type="text"
              name="title"
              value={selectCurrentTickets.title}
              onChange={props.onChangeTickets}
            />
          </div>
          <div className="input-group mb-2">
            <span className="input-group-text">Assignee </span>
            <input
              className="form-control"
              type="text"
              name="assignee"
              value={selectCurrentTickets.assignee}
              onChange={onChangeTickets}
            />
          </div>
          <div className="input-group mb-2">
            <span className="input-group-text">Status </span>
            <input
              className="form-control"
              type="text"
              name="status"
              value={selectCurrentTickets.status}
              onChange={onChangeTickets}
            />
          </div>
          <div className="input-group mb-2">
            <span className="input-group-text">Priority </span>
            <input
              className="form-control"
              type="text"
              name="priority"
              value={selectCurrentTickets.ticketPriority}
              onChange={onChangeTickets}
            />
          </div>
          <div className="input-group mb-2">
            <textarea
              type="text"
              name="description"
              onChange={onChangeTickets}
              className="form-control mb-2 md-textarea"
              value={selectCurrentTickets.description}
            />
          </div>
          <Button variant="warning" onClick={closeModal} className="m-3">
            Close
          </Button>
          <Button variant="primary" type="submit" className="m-3">
            Save Changes
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
