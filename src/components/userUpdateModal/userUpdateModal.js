import React from "react";
import { Button, Modal } from "react-bootstrap";

export default function UserUpdateModal(props) {
  const {
    closeUserUpdateModal,
    changeUserDetails,
    submitUserDetail,
    userUpdateModal,
    selectCurrentUsers,
  } = props;
  return (
    <div>
      <Modal show={userUpdateModal} onHide={closeUserUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>EDIT DETAILS</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={submitUserDetail}>
            <div className="card submit mb-2 ">
              <h6>
                USER ID : {selectCurrentUsers.userId} (
                {selectCurrentUsers.userTypes})
              </h6>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text"> Name </span>
              <input
                type="text"
                disabled
                name="user"
                value={selectCurrentUsers.name}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text"> EMAIL </span>
              <input
                type="text"
                name="email"
                disabled
                value={selectCurrentUsers.email}
              />
            </div>

            <select
              name="status"
              value={selectCurrentUsers.userStatus}
              onChange={changeUserDetails}
              className="form-select"
            >
              <option value="APPROVED"> APPROVED </option>
              <option value="PENDING"> PENDING </option>
              <option value="REJECTED"> REJECTED </option>
            </select>

            <Button
              variant="warning"
              onClick={closeUserUpdateModal}
              className="m-3"
            >
              Close
            </Button>
            <Button variant="primary" type="submit" className="m-3">
              Save Changes
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
