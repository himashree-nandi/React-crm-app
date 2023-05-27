import { getAllUsers } from "../api/user";
import { useState, useEffect } from "react";

export const useFetchUsers = () => {
  const [userDetails, setUserDetails] = useState([]);
  useEffect(() => {
    fetchUsers();
  }, []);

  //fetch all user details
  const fetchUsers = () => {
    getAllUsers()
      .then((res) => {
        setUserDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return [userDetails,fetchUsers];
};
