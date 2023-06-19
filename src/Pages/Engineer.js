import { useContext, React } from "react";
import { ThemeContext } from "../App";

import Sidebar from "../components/Sidebar";
import StatusDashBoard from "../components/StatusDashBoard";
import { useFetchTickets } from "../hooks/useFetchTickets";
import { useTicketUpdate } from "../hooks/useTicketUpdate";
import TicketUpdateModal from "../components/ticketspdateModal/ticketUpdateModal";
import TicketsTable from "../components/TicketsTable/ticketsTable";
export default function Engineer() {
  const [ticketDetails] = useFetchTickets();
  const [
    selectCurrentTickets,
    ticketUpdateModal,
    editTickets,
    closeModal,
    onChangeTickets,
    submitTickets,
  ] = useTicketUpdate();
  const value = useContext(ThemeContext);
  const theme = value.theme;
  return (
    <div
      className="row text-align-center"
      style={{
        background:
          theme === "light"
            ? "linear-gradient(to right ,white,rgb(173, 222, 232))"
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
            title={"TICKETS ASSIGNED TO YOU"}
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
    </div>
  );
}
