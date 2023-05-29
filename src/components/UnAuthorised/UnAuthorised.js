import React from "react";
import { Logout } from "../../handlers/Logout";
export default function UnAuthorised(props) {
  return (
    <div className="text-center bg-white text-dark vh-100 justify-content-center align-items-center d-flex flex-column">
      <h3>Opps ! User of {props.userType} type does't sufficient permissons to access this page </h3>
      <h6>LogIn as another role</h6>
     <button onClick={Logout} className="text-white btn btn-success" style={{cursor:"pointer"}}>Go Back</button>
    </div>
  );
}
