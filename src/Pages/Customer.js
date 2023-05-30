import React from "react";
import Sidebar from "../components/Sidebar";
import StatusDashBoard from "../components/StatusDashBoard";
import { useFetchTickets } from "../hooks/useFetchTickets";
import { useTicketUpdate } from "../hooks/useTicketUpdate";
import TicketUpdateModal from "../components/ticketspdateModal/ticketUpdateModal";
import TicketsTable from "../components/TicketsTable/ticketsTable";
import TicketCreationModal from "../components/TicketCreationModal";
import useCreateTicket from "../hooks/useCreateTicket";
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
  const {onclose, createTicketModal, openTicketModal} = useCreateTicket();
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
        <input
          type="submit"
          className="btn btn-primary mt-1"
          style={{ width: "100%" }}
          value="Create a ticket"
          onClick={openTicketModal}
        />
      </div>
      <TicketUpdateModal
        selectCurrentTickets={selectCurrentTickets}
        ticketUpdateModal={ticketUpdateModal}
        closeModal={closeModal}
        onChangeTickets={onChangeTickets}
        submitTickets={submitTickets}
      />
      <TicketCreationModal show={createTicketModal} onclose={onclose}/>
    </div>
  );
}
export default Customer;
