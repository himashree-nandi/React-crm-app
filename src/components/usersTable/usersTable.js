import React from "react";
import MaterialTable from "material-table";
export default function UsersTable(props) {
  return (
    <MaterialTable
      title={props.title}
      columns={[
        { title: "USER ID", field: "userId" },
        { title: "NAME", field: "name" },
        { title: "EMAIL ", field: "email" },
        { title: "ROLE ", field: "userTypes" },
        { title: "STATUS ", field: "userStatus" },
      ]}
      data={props.userDetails}
      onRowClick={(event, rowDeta) => {
        props.editUsers(rowDeta);
      }}
      options={{
        sorting: true,
        filtering: true,
        rowStyle: { cursor: "pointer" },
        headerStyle:{ backgroundColor:"rgb(47, 226, 131)"}
      }}
    />
  );
}
