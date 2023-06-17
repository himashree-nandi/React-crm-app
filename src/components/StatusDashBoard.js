import React, { useContext } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import createTicketCount from "../handlers/TicketHandler";
import { ThemeContext } from "../App";
export default function StatusDashBoard(props) {
  //console.log(props.statusDetails);
  const statusDetails = createTicketCount(props.ticketDetails);
  const userName = localStorage.getItem("name");
  const userType = localStorage.getItem("userType");
  const value = useContext(ThemeContext);
  const theme = value.theme;
  return (
    <div className="col my-4 vh-100%">
      <div className="container">
        <div
          className="d-flex mb-2"
          style={{ justifyContent: "space-between" }}
        ></div>
        <h1
          className={
            theme === "light"
              ? "text-primary text-center"
              : "text-white text center"
          }
        >
          <i
            style={{
              fontWeight: "650",
              fontSize: "40px",
            }}
          >
            Welcome, {userName}
          </i>
        </h1>
        <h5
          className={
            theme === "light"
              ? "text-center text-muted mb-4"
              : "text-center text-white mb-4"
          }
        >
          <i> Take a quick look at your {userType} stats below</i>
        </h5>

        <div className="row text-center">
          <div className="col-xs-12 col-lg-3 col-md-6 my-1 ">
            <div
              className="card rounded shadow border-primary"
              style={{ backgroundColor: "rgb(202, 189, 254)" }}
            >
              <div className="card-body">
                <h3>
                  <i className="bi bi-pencil mx-3 align-items-center text-primary "></i>
                  <i>Open</i>
                  <hr />
                </h3>
                <div className="row">
                  <div className="col">
                    <h1>
                      <i>{statusDetails.open}</i>
                    </h1>
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
              className="card rounded shadow border-danger"
              style={{ backgroundColor: "rgb(254, 226, 159)" }}
            >
              <div className="card-body">
                <h3>
                  <i className="bi bi-lightning-charge mx-3 align-items-center text-danger "></i>
                  <i> Progress</i>
                  <hr />
                </h3>
                <div className="row">
                  <div className="col">
                    <h1>
                      <i>{statusDetails.progress}</i>
                    </h1>
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
              className="card rounded shadow border-success"
              style={{ backgroundColor: "rgb(195, 229, 168)" }}
            >
              <div className="card-body">
                <h3>
                  <i className="bi bi-check-circle mx-3 align-items-center text-success "></i>
                  <i>Closed</i>
                  <hr />
                </h3>
                <div className="row">
                  <div className="col">
                    <h1>
                      <i>{statusDetails.closed}</i>
                    </h1>
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
              className="card rounded shadow border-dark"
              style={{ backgroundColor: "rgb(232, 223, 223)" }}
            >
              <div className="card-body">
                <h3>
                  <i className="bi bi-slash-circle mx-3 align-items-center text-dark "></i>
                  <i>Blocked</i>
                  <hr />
                </h3>
                <div className="row">
                  <div className="col">
                    <h1>
                      <i>{statusDetails.blocked}</i>
                    </h1>
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
