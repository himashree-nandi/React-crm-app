import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { getAllTickets, updateTickets } from "../api/tickets";
import MaterialTable from "material-table";
import { getAllUsers, updateUsers } from "../api/user";
import { Button, Modal } from "react-bootstrap";
export default function Admin() {
  const userName = localStorage.getItem("name");
  const userType = localStorage.getItem("userType");
  const [ticketDetails, setTicketDetails] = useState([]);
  const [ticketStatusCount, setTicketStatusCount] = useState({});
  const [userDetails, setUserDetails] = useState([]);
  const [selectCurrentTickets, setSelectCurrentTickets] = useState({});
  const [ticketUpdateModal, setTicketUpdateModal] = useState(false);
  const [userUpdateModal, setUserUpdateModal] = useState(false);
  const [selectCurrentUsers, setSelectCurrentUser] = useState(false);
  useEffect(() => {
    fetchUsers();
    fetchTickets();
  }, []);

  // Fetch all ticket details
  const fetchTickets = () => {
    getAllTickets()
      .then((res) => {
        setTicketDetails(res.data);
        updateTicketCount(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // function for update the ticket count
  const updateTicketCount = (tickets) => {
    const data = {
      open: 0,
      closed: 0,
      progress: 0,
      blocked: 0,
    };

    tickets.forEach((ticket) => {
      if (ticket.status === "OPEN") {
        data.open += 1;
      } else if (ticket.status === "PROGRESS") {
        data.progress += 1;
      } else if (ticket.status === "BLOCKED") {
        data.blocked += 1;
      } else {
        data.closed += 1;
      }
    });

    setTicketStatusCount({ ...data });
  };

  // function for edit the ticket
  const editTickets = (ticketDetails) => {
    console.log(ticketDetails);
    setTicketUpdateModal(true);
    setSelectCurrentTickets(ticketDetails);
  };
  // function for close the modal
  const closeModal = () => {
    setTicketUpdateModal(false);
  };

  // onChange event for update ticket details
  const onChangeTickets = (e) => {
    const fieldName = e.target.name;
    if (fieldName === "title") {
      selectCurrentTickets.title = e.target.value;
    } else if (fieldName === "status") {
      selectCurrentTickets.status = e.target.value;
    } else if (fieldName === "priority") {
      selectCurrentTickets.ticketPriority = e.target.value;
    } else if (fieldName === "assignee") {
      selectCurrentTickets.assignee = e.target.value;
    } else if (fieldName === "description") {
      selectCurrentTickets.description = e.target.value;
    }
    setSelectCurrentTickets({ ...selectCurrentTickets });
  };

  // function for submit the update tickets
  const submitTickets = (e) => {
    e.preventDefault();
    updateTickets(selectCurrentTickets)
      .then(() => {
        console.log("Update tickets successfully");
        setTicketUpdateModal(false);
        fetchTickets();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //--------------------------------users------------------------------------------
  // fetch all users details
  const fetchUsers = () => {
    getAllUsers()
      .then((res) => {
        setUserDetails(res.data);
        //console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // close the User update modal
  const closeUserUpdateModal = () => {
    setUserUpdateModal(false);
  };
  // function for edit the user detail
  const editUsers = (userDetails) => {
    //console.log(userDetails);
    setSelectCurrentUser(userDetails);
    setUserUpdateModal(true);
  };

  // onChange event for update user detail
  const changeUserDetails = (e) => {
    //console.log(e.target.value);
    if (e.target.name === "status") {
      selectCurrentUsers.userStatus = e.target.value;
    }
    setSelectCurrentUser({ ...selectCurrentUsers });
  };

  // onsubmit function for submit update user detail
  const submitUserDetail = (e) => {
    e.preventDefault();
    const userData = {
      _id: selectCurrentUsers._id,
      status: selectCurrentUsers.userStatus,
    };
    updateUsers(userData)
      .then((res) => {
        if (res.status === 200) {
          console.log("User update successfully");
          setUserUpdateModal(false);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div
      className="row text-align-center"
      style={{
        background: "linear-gradient(150deg,white,black",
      }}
    >
      <div className="col-1">
        <Sidebar />
      </div>
      <div className="col my-4 vh-100%">
        <div className="container">
          <h1 className="text-primary text-center">
            <i> Welcome, {userName}</i>
          </h1>
          <p className="text-center text-muted">
            <i> Take a quick look at your {userType} stats below</i>
          </p>
          <div className="row text-center">
            <div className="col-xs-12 col-lg-3 col-md-6 my-1 ">
              <div
                className="card rounded shadow border-bottom-primary"
                style={{ backgroundColor: "rgb(202, 189, 254)" }}
              >
                <div className="card-body">
                  <h5>
                    <i className="bi bi-pencil mx-3 align-items-center text-primary "></i>
                    Open
                    <hr />
                  </h5>
                  <div className="row">
                    <div className="col">
                      <h2>{ticketStatusCount.open}</h2>
                    </div>
                    <div className="col">
                      <div style={{ width: "40px", height: "40px" }}>
                        <CircularProgressbar
                          value={ticketStatusCount.open}
                          styles={buildStyles({
                            textColor: "rgb(25, 25, 254)",
                            pathColor: "rgb(25, 25, 254)",
                          })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-lg-3 col-md-6 my-1 ">
              <div
                className="card rounded shadow border-bottom-danger"
                style={{ backgroundColor: "rgb(254, 226, 159)" }}
              >
                <div className="card-body">
                  <h5>
                    <i className="bi bi-lightning-charge mx-3 align-items-center text-danger "></i>
                    Progress
                    <hr />
                  </h5>
                  <div className="row">
                    <div className="col">
                      <h2>{ticketStatusCount.progress}</h2>
                    </div>
                    <div className="col">
                      <div style={{ width: "40px", height: "40px" }}>
                        <CircularProgressbar
                          value={ticketStatusCount.progress}
                          styles={buildStyles({
                            textColor: "rgb(244, 58, 1)",
                            pathColor: "rgb(244, 58, 1)",
                          })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-lg-3 col-md-6 my-1 ">
              <div
                className="card rounded shadow border-bottom-success"
                style={{ backgroundColor: "rgb(195, 229, 168)" }}
              >
                <div className="card-body">
                  <h5>
                    <i className="bi bi-check-circle mx-3 align-items-center text-success "></i>
                    Closed
                    <hr />
                  </h5>
                  <div className="row">
                    <div className="col">
                      <h2>{ticketStatusCount.closed}</h2>
                    </div>
                    <div className="col">
                      <div style={{ width: "40px", height: "40px" }}>
                        <CircularProgressbar
                          value={ticketStatusCount.closed}
                          styles={buildStyles({
                            textColor: "green",
                            pathColor: "green",
                          })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-lg-3 col-md-6 my-1 ">
              <div
                className="card rounded shadow border-bottom-dark"
                style={{ backgroundColor: "rgb(232, 223, 223)" }}
              >
                <div className="card-body">
                  <h5>
                    <i className="bi bi-slash-circle mx-3 align-items-center text-dark "></i>
                    Blocked
                    <hr />
                  </h5>
                  <div className="row">
                    <div className="col">
                      <h2>{ticketStatusCount.blocked}</h2>
                    </div>
                    <div className="col">
                      <div style={{ width: "40px", height: "40px" }}>
                        <CircularProgressbar
                          value={ticketStatusCount.blocked}
                          styles={buildStyles({
                            textColor: "black",
                            pathColor: "rgb(44, 44, 66)",
                          })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div style={{ maxWidth: "100%", cursor: "pointer" }}>
            <MaterialTable
              title="USER RECORDS"
              columns={[
                { title: "USER ID", field: "userId" },
                { title: "NAME", field: "name" },
                { title: "EMAIL ", field: "email" },
                { title: "ROLE ", field: "userTypes" },
                { title: "STATUS ", field: "userStatus" },
              ]}
              data={userDetails}
              onRowClick={(rowDeta) => {
                editUsers(rowDeta);
              }}
              options={{
                sorting: true,
                filtering: true,
                rowStyle: { cursor: "pointer" },
              }}
            />
          </div>
          <Modal show={userUpdateModal} onHide={closeUserUpdateModal}>
            <Modal.Header closeButton>
              <Modal.Title>EDIT DETAILS</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={submitUserDetail}>
                <div className="card submit mb-2 ">
                  <h6>
                    USER ID : {selectCurrentUsers.userId} (
                    {selectCurrentUsers.userTypes})
                  </h6>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text"> Name </span>
                  <input
                    type="text"
                    disabled
                    name="user"
                    value={selectCurrentUsers.name}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text"> EMAIL </span>
                  <input
                    type="text"
                    name="email"
                    disabled
                    value={selectCurrentUsers.email}
                  />
                </div>

                <select
                  name="status"
                  value={selectCurrentUsers.userStatus}
                  onChange={changeUserDetails}
                  className="form-select"
                >
                  <option value="APPROVED"> APPROVED </option>
                  <option value="PENDING"> PENDING </option>
                  <option value="REJECTED"> REJECTED </option>
                </select>

                <Button
                  variant="warning"
                  onClick={closeUserUpdateModal}
                  className="m-3"
                >
                  Close
                </Button>
                <Button variant="primary" type="submit" className="m-3">
                  Save Changes
                </Button>
              </form>
            </Modal.Body>
          </Modal>
          <br />
          <hr />
          <div style={{ maxWidth: "100%" }}>
            <MaterialTable
              title="TICKET RECORDS"
              onRowClick={(rowDeta) => {
                editTickets(rowDeta);
              }}
              columns={[
                { title: "TICKIT ID", field: "_id" },
                { title: "TITLE", field: "title" },
                { title: "DESCRIPTION ", field: "description" },
                { title: "REQUESTOR ", field: "requestor" },
                { title: "PRIORITY ", field: "ticketPriority" },
                { title: "ASSIGNEE", field: "assignee" },
                { title: "STATUS", field: "status" },
              ]}
              data={ticketDetails}
              options={{
                sorting: true,
                rowStyle: { cursor: "pointer" },
              }}
            />
          </div>
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
                    onChange={onChangeTickets}
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
        </div>
      </div>
    </div>
  );
}
