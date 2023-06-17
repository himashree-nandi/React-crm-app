import { useState } from "react";
import { updateUsers } from "../api/user";
import { useNavigate, useLocation } from "react-router-dom";
export const useUserUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userUpdateModal, setUserUpdateModal] = useState(false);
  const [selectCurrentUsers, setSelectCurrentUser] = useState(false);
  // function for edit the user detail
  const editUsers = (userDetails) => {
    //console.log(userDetails);
    setSelectCurrentUser(userDetails);
    setUserUpdateModal(true);
    const url = `${location.pathname}/${userDetails.userId}`;
    navigate(url);
  };
  const closeUserUpdateModal = () => {
    setUserUpdateModal(false);
    const url = `/admin`;
    navigate(url);
  };
  // onChange event for update user detail
  const changeUserDetails = (e) => {
    if (e.target.name === "status") {
      selectCurrentUsers.userStatus = e.target.value;
    }
    setSelectCurrentUser({ ...selectCurrentUsers });
  };
  // onsubmit function for submit update user detail
  const submitUserDetail = (e) => {
    e.preventDefault();
    const url = `/admin`;
    navigate(url);
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
    editUsers,
    closeUserUpdateModal,
    changeUserDetails,
    submitUserDetail,
    userUpdateModal,
    selectCurrentUsers,
    setSelectCurrentUser
  ];
};
