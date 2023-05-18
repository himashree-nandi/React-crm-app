import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { getAllTickets } from "../api/tickets";
import MaterialTable from "material-table";
import { getAllUsers } from "../api/user";
export default function Admin() {
  const userName = localStorage.getItem("name");
  const userType = localStorage.getItem("userType");
  const [ticketDetails, setTicketDetails] = useState([]);
  const [ticketStatusCount, setTicketStatusCount] = useState({});
  const [userDetails, setUserDetails] = useState([]);
  useEffect(() => {
    fetchUsers();
    fetchTickets();
  },[]);

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

  // fetch all users details
  const fetchUsers = () => {
    getAllUsers()
      .then((res) => {
        setUserDetails(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateTicketCount = (tickets) => {
    const data = {
      open: 0,
      closed: 0,
      progress: 0,
      blocked: 0,
    };

    tickets.forEach((ticket) => {
      if (ticket.status === "OPEN") data.pending += 1;
      else if (ticket.status === "INPROGRESS") data.progress += 1;
      else if (ticket.status === "BLOCKED") data.blocked += 1;
      else data.closed += 1;
    });

    setTicketStatusCount({ ...data });
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
          <div style={{ maxWidth: "100%" }}>
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
              options={{
                sorting: true,
              }}
            />
          </div>
          <br />
          <hr />
          <div style={{ maxWidth: "100%" }}>
            <MaterialTable
              title="TICKET RECORDS"
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
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
