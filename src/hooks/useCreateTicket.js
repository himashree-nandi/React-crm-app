import { useState } from "react";
export default function useCreateTicket() {
  const [createTicketModal, setCreateTicketModal] = useState(false);
  const onclose = () => {
    setCreateTicketModal(false);
  };
 const openTicketModal = () => {
    setCreateTicketModal(true);
  };
  return {onclose, openTicketModal, createTicketModal};
}
