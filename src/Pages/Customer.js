import React from "react";
import Sidebar from "../components/Sidebar";
import StatusDashBoard from "../components/StatusDashBoard";
import { useFetchTickets } from "../hooks/useFetchTickets";
import { useTicketUpdate } from "../hooks/useTicketUpdate";
import TicketUpdateModal from "../components/ticketspdateModal/ticketUpdateModal";
import TicketsTable from "../components/TicketsTable/ticketsTable";
function Customer() {
  const [ticketDetails] = useFetchTickets();
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
      <div className="col" style={{ maxWidth: "100%" }}>
        <StatusDashBoard ticketDetails={ticketDetails} />
        <TicketsTable
          ticketDetails={ticketDetails}
          editTickets={editTickets}
          title={"TICKETS RAISED BY YOU"}
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
  );
}
export default Customer;
