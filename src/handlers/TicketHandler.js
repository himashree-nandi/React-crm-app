const createTicketCount = (tickets) => {
  const data = {
    open: 0,
    closed: 0,
    progress: 0,
    blocked: 0,
  };

  tickets.forEach((ticket) => {
    if (ticket.status === "OPEN") {
      data.open += 1;
    } else if (ticket.status === "PROGRESS") {
      data.progress += 1;
    } else if (ticket.status === "BLOCKED") {
      data.blocked += 1;
    } else {
      data.closed += 1;
    }
  });

  return data;
};
export default createTicketCount;
