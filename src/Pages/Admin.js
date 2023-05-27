import React from "react";
import Sidebar from "../components/Sidebar";
import MaterialTable from "material-table";
import { Button, Modal } from "react-bootstrap";
import StatusDashBoard from "../components/StatusDashBoard";
import { useFetchTickets } from "../hooks/useFetchTickets";
import { useFetchUsers } from "../hooks/useFetchUsers";
import { useUserUpdate } from "../hooks/useUserUpdate";
import { useTicketUpdate } from "../hooks/useTicketUpdate";
import TicketsTable from "../components/TicketsTable/ticketsTable";
import TicketUpdateModal from "../components/ticketspdateModal/ticketUpdateModal";
export default function Admin() {
  const [ticketDetails, fetchTickets] = useFetchTickets();
  const [userDetails, fetchUsers] = useFetchUsers();

  const [
    editUsers,
    closeUserUpdateModal,
    changeUserDetails,
    submitUserDetail,
    userUpdateModal,
    selectCurrentUsers,
  ] = useUserUpdate();

  const [
    selectCurrentTickets,
    ticketUpdateModal,
    editTickets,
    closeModal,
    onChangeTickets,
    submitTickets,
  ] = useTicketUpdate();

  return (
    <div
      className="row text-align-center"
      style={{
        background: "linear-gradient(to right ,white,rgb(115,219,222))",
      }}
    >
      <div className="col-1">
        <Sidebar />
      </div>
      <div className="col my-4 vh-100%">
        <div className="container">
          <StatusDashBoard ticketDetails={ticketDetails} />
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
              onRowClick={(event, rowDeta) => {
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
            <TicketsTable
              ticketDetails={ticketDetails}
              editTickets={editTickets}
              title="TICKET RECORDS"
            />
          </div>
          <TicketUpdateModal
            selectCurrentTickets={selectCurrentTickets}
            ticketUpdateModal={ticketUpdateModal}
            closeModal={closeModal}
            onChangeTickets={onChangeTickets}
            submitTickets={submitTickets}
          />
        </div>
      </div>
    </div>
  );
}
