import {useContext,React} from "react";
import Sidebar from "../components/Sidebar";
import StatusDashBoard from "../components/StatusDashBoard";
import { useFetchTickets } from "../hooks/useFetchTickets";
import { useTicketUpdate } from "../hooks/useTicketUpdate";
import TicketUpdateModal from "../components/ticketspdateModal/ticketUpdateModal";
import TicketsTable from "../components/TicketsTable/ticketsTable";
import TicketCreationModal from "../components/TicketCreationModal";
import useCreateTicket from "../hooks/useCreateTicket";
import { ThemeContext } from "../App";
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
  const { onclose, createTicketModal, openTicketModal } = useCreateTicket();
  const value = useContext(ThemeContext);
  const theme = value.theme;
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
      <div className="col" style={{ maxWidth: "100%" }}>
        <StatusDashBoard ticketDetails={ticketDetails} />
        <br />
        <div className="m-3" style={{ fontWeight: "600" }}>
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
      </div>
      <TicketUpdateModal
        selectCurrentTickets={selectCurrentTickets}
        ticketUpdateModal={ticketUpdateModal}
        closeModal={closeModal}
        onChangeTickets={onChangeTickets}
        submitTickets={submitTickets}
      />
      <TicketCreationModal useFetchTickets={useFetchTickets} show={createTicketModal} onclose={onclose} />
    </div>
  );
}
export default Customer;
