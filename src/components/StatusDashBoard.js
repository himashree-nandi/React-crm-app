import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import createTicketCount from "../handlers/TicketHandler";

export default function StatusDashBoard(props) {
  //console.log(props.statusDetails);
  const statusDetails = createTicketCount(props.ticketDetails);
  const userName = localStorage.getItem("name");
  const userType = localStorage.getItem("userType");
  return (
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
                    <h2>{statusDetails.open}</h2>
                  </div>
                  <div className="col">
                    <div style={{ width: "40px", height: "40px" }}>
                      <CircularProgressbar
                        value={statusDetails.open}
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
                    <h2>{statusDetails.progress}</h2>
                  </div>
                  <div className="col">
                    <div style={{ width: "40px", height: "40px" }}>
                      <CircularProgressbar
                        value={statusDetails.progress}
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
                    <h2>{statusDetails.closed}</h2>
                  </div>
                  <div className="col">
                    <div style={{ width: "40px", height: "40px" }}>
                      <CircularProgressbar
                        value={statusDetails.closed}
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
                    <h2>{statusDetails.blocked}</h2>
                  </div>
                  <div className="col">
                    <div style={{ width: "40px", height: "40px" }}>
                      <CircularProgressbar
                        value={statusDetails.blocked}
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
      </div>
    </div>
  );
}
