import React from "react";
import { Link } from "react-router-dom";
export default function UnAuthenticated() {
  return (
    <div className="text-center bg-white text-dark vh-100 justify-content-center align-items-center d-flex flex-column">
      <h3>Insufficient permissons to access this page</h3>
      <h6>Move to login page</h6>
      <button className="btn btn-success"><Link to="/" className="text-white" style={{textDecoration:"none"}}>Go Back</Link></button>
    </div>
  );
}
