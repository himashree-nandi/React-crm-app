import { getAllTickets } from "../api/tickets";
import { useState, useEffect } from "react";

export const useFetchTickets = () => {
  const [ticketDetails, setTicketDetails] = useState([]);
  useEffect(() => {
    fetchTickets();
  }, []);

  // Fetch all ticket details
  const fetchTickets = () => {
    getAllTickets()
      .then((res) => {
        setTicketDetails(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return [ticketDetails, fetchTickets];
};
