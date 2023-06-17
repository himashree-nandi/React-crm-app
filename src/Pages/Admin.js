import React, { useContext, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import StatusDashBoard from "../components/StatusDashBoard";
import { useFetchTickets } from "../hooks/useFetchTickets";
import { useFetchUsers } from "../hooks/useFetchUsers";
import { useUserUpdate } from "../hooks/useUserUpdate";
import { useTicketUpdate } from "../hooks/useTicketUpdate";
import TicketsTable from "../components/TicketsTable/ticketsTable";
import TicketUpdateModal from "../components/ticketspdateModal/ticketUpdateModal";
import UsersTable from "../components/usersTable/usersTable";
import UserUpdateModal from "../components/userUpdateModal/userUpdateModal";
import { useLocation } from "react-router-dom";
import { ThemeContext } from "../App";
export default function Admin() {
  const [ticketDetails] = useFetchTickets();
  const [userDetails] = useFetchUsers();
  const value = useContext(ThemeContext);
  const theme = value.theme;
  const [
    editUsers,
    closeUserUpdateModal,
    changeUserDetails,
    submitUserDetail,
    userUpdateModal,
    selectCurrentUsers,
    setSelectCurrentUser,
  ] = useUserUpdate();

  const [
    selectCurrentTickets,
    ticketUpdateModal,
    editTickets,
    closeModal,
    onChangeTickets,
    submitTickets,
  ] = useTicketUpdate();

  const location = useLocation();
  useEffect(() => {
    const userId = location.pathname.split("/")[2];
    if (!userId) {
      return;
    }
    console.log(userId);
    // const user = userDetails.find((user) => user.userId === userId);
    // if (!user) {
    //   return;
    // }
    // setSelectCurrentUser(user);
  }, []);
  return (
    <div
      className="row text-align-center"
      style={{
        background:
          theme === "light"
            ? "linear-gradient(to right ,rgb(173, 222, 232),white)"
            : "black",
      }}
    >
      <div className="col-1">
        <Sidebar />
      </div>
      <div className="col my-4 vh-100%">
        <div className="container">
          <StatusDashBoard ticketDetails={ticketDetails} />
          <br />
          <div
            className="m-1"
            style={{ maxWidth: "100%", cursor: "pointer", fontWeight: "600" }}
          >
            <UsersTable
              userDetails={userDetails}
              editUsers={editUsers}
              title="USER RECORDS"
            />
          </div>
          <UserUpdateModal
            editUsers={editUsers}
            closeUserUpdateModal={closeUserUpdateModal}
            changeUserDetails={changeUserDetails}
            submitUserDetail={submitUserDetail}
            userUpdateModal={userUpdateModal}
            selectCurrentUsers={selectCurrentUsers}
          />
          <br />
          <hr />
          <div style={{ maxWidth: "100%", fontWeight: "600" }}>
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
