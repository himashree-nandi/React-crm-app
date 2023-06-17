import { useState } from "react";
import { updateTickets } from "../api/tickets";
export const useTicketUpdate = () => {
  const [selectCurrentTickets, setSelectCurrentTickets] = useState({});
  const [ticketUpdateModal, setTicketUpdateModal] = useState(false);
  const editTickets = (ticketDetails) => {
    //console.log(ticketDetails);
    setTicketUpdateModal(true);
    setSelectCurrentTickets({ ...ticketDetails });
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
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return [
    selectCurrentTickets,
    ticketUpdateModal,
    editTickets,
    closeModal,
    onChangeTickets,
    submitTickets,
  ];
};
