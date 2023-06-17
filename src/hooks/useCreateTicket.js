import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useCreateTicket() {
  const [createTicketModal, setCreateTicketModal] = useState(false);
  const navigate = useNavigate();
  const onclose = () => {
    setCreateTicketModal(false);
    navigate("/customer");
  };
  const openTicketModal = () => {
    setCreateTicketModal(true);
    navigate("/customer/createTicket");
  };
  return { onclose, openTicketModal, createTicketModal };
}
