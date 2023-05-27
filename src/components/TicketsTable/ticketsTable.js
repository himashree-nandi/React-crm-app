import React from "react";
import MaterialTable from "material-table";
export default function TicketsTable(props) {
  return (
    <MaterialTable
      title={props.title}
      onRowClick={(event, rowDeta) => props.editTickets(rowDeta)}
      columns={[
        { title: "TICKIT ID", field: "_id" },
        { title: "TITLE", field: "title" },
        { title: "DESCRIPTION ", field: "description" },
        { title: "REQUESTOR ", field: "requestor" },
        { title: "PRIORITY ", field: "ticketPriority" },
        { title: "ASSIGNEE", field: "assignee" },
        { title: "STATUS", field: "status" },
      ]}
      data={props.ticketDetails}
      options={{
        sorting: true,
        rowStyle: { cursor: "pointer" },
      }}
    />
  );
}
