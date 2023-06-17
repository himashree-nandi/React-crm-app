import { Button, Modal } from "react-bootstrap";
import { createNewTickets } from "../api/tickets";
import { useContext } from "react";
import { ThemeContext } from "../App";
export default function TicketCreationModal(props) {
  const submitTickets = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const priority = e.target.priority.value;
    const description = e.target.description.value;
    var ticket = { title, priority, description };
    createNewTickets(ticket)
      .then((res) => {
        console.log("Create ticket successfully");
        console.log(res);
        window.location.href = "/customer";
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const value=useContext(ThemeContext)
  const theme=value.theme
  return (
      <Modal show={props.show} onHide={props.onclose}>
        <Modal.Header closeButton>
          <Modal.Title>CREATE A NEW TICKET</Modal.Title>
        </Modal.Header>
        <Modal.Body className={theme==="light"?"bg-light":"bg-black"}>
          <form onSubmit={submitTickets}>
            <div className="input-group mb-2">
              <span className="input-group-text">Title </span>
              <input
                className="form-control"
                type="text"
                name="title"
                required
                placeholder="Enter title"
              />
            </div>

            <div className="input-group mb-2">
              <span className="input-group-text">Priority </span>
              <select name="priority" className="form-select">
                <option value="1"> 1 </option>
                <option value="2"> 2 </option>
                <option value="3"> 3 </option>
                <option value="4"> 4 </option>
                <option value="5"> 5 </option>
              </select>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Description </span>
              <textarea
                name="description"
                type="text"
                className="md-texarea"
                required
                rows={4}
              />
            </div>
            <Button variant="warning" onClick={props.onclose} className="m-3">
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
