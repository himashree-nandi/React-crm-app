import { useState } from "react";
import { updateUsers } from "../api/user";
export const useUserUpdate = () => {
  const [userUpdateModal, setUserUpdateModal] = useState(false);
  const [selectCurrentUsers, setSelectCurrentUser] = useState(false);
  // function for open the user update modal
  const openUserModal = () => {

    setUserUpdateModal(true);
  };
  console.log(openUserModal)
  // function for edit the user detail
  const editUsers = (userDetails) => {
    //console.log(userDetails);
    setSelectCurrentUser(userDetails);
    setUserUpdateModal(true);
  };
  const closeUserUpdateModal = () => {
    setUserUpdateModal(false);
  };
  // onChange event for update user detail
  const changeUserDetails = (e) => {
    //console.log(e.target.value);
    if (e.target.name === "status") {
      selectCurrentUsers.userStatus = e.target.value;
    }
    setSelectCurrentUser({ ...selectCurrentUsers });
  };
  // onsubmit function for submit update user detail
  const submitUserDetail = (e) => {
    e.preventDefault();
    const userData = {
      _id: selectCurrentUsers._id,
      status: selectCurrentUsers.userStatus,
    };
    updateUsers(userData)
      .then((res) => {
        if (res.status === 200) {
          console.log("User update successfully");
          setUserUpdateModal(false);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return [
    openUserModal,
    editUsers,
    closeUserUpdateModal,
    changeUserDetails,
    submitUserDetail,
    userUpdateModal,
    selectCurrentUsers,
  ];
};
