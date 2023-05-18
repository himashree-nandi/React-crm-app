import React, { useEffect } from "react";
import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { userSignIn, userSignUp } from "../api/auth";
export default function Login() {
  const [showSignup, setshowSignup] = useState(false);
  const [userType, setUsertype] = useState("CUSTOMER");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [userId, setuserId] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    const token = localStorage.getItem("token");
    if (!userType || !token) {
      return;
    }
    if (userType === "ENGINEER") {
      window.location.href = "/engineer";
    } else if (userType === "CUSTOMER") {
      window.location.href = "/customer";
    } else {
      window.location.href = "/admin";
    }
  }, []);
  //-----onClick event for change the login page and signIn page----
  const toggleSignup = () => {
    clearState();
    setshowSignup(!showSignup);
  };
  function changeUserType(eventKey) {
    setUsertype(eventKey);
  }
  // Clear the input
  const clearState = () => {
    setuserId("");
    setEmail("");
    setUserName("");
    setPassword("");
    setError(false);
    setMessage("");
  };
  //---- onChange event handler for all inputs---------
  const handleChange = (e) => {
    const id = e.target.id;

    if (id === "userId") {
      setuserId(e.target.value);
    } else if (id === "password") {
      setPassword(e.target.value);
    } else if (id === "email") {
      setEmail(e.target.value);
    } else {
      setUserName(e.target.value);
    }
  };

  //---------------On Submit function for Signin page------------
  function onSubmitSignup(e) {
    const data = {
      name: userName,
      userId: userId,
      email: email,
      password: password,
      userType: userType,
    };
    e.preventDefault();
    //------Validation-------------
    if (userId.length < 5) {
      setError(true);
      setMessage("userId should of 5 to 15 character");
      return;
    } else if (password.length < 5) {
      setError(true);
      setMessage("Password (6 or more characters)");
      return;
    } else if (userName === "") {
      setError(true);
      setMessage("UserName is required");
      return;
    } else if (email === "") {
      setError(true);
      setMessage("Email is required");
      return;
    }
    // ----- Api call
    userSignUp(data)
      .then((res) => {
        console.log(res);
        setError(false);
        setMessage("SignUp successful");
        toggleSignup();
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setError(true);
          setMessage(err.response.data.message);
        }
      });
  }

  function onSubmitLogin(e) {
    const data = { userId, password };
    e.preventDefault();
    userSignIn(data)
      .then((res) => {
        console.log(res);
        setError(false);
        setMessage("LogIn successful");
        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("userType", res.data.userType);
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("userStatus", res.data.userStatus);

        if (res.data.userType === "ENGINEER") {
          window.location.href = "/engineer";
        } else if (res.data.userType === "CUSTOMER") {
          window.location.href = "/customer";
        } else {
          window.location.href = "/admin";
        }
      })
      .catch((err) => {
        if (err.response.status) {
          setError(true);
          setMessage(err.response.data.message);
        }
      });
  }
  return (
    <div
      className=" align-items-center justify-content-center d-flex vh-100"
      style={{
        background: "linear-gradient(150deg,blue,black)",
      }}
    >
      <div
        className="card p-3 m-3 rounded shadow"
        style={{ width: 30 + "rem" }}
      >
        <form onSubmit={showSignup ? onSubmitSignup : onSubmitLogin}>
          <h3 className="text-center">{showSignup ? "Sign up" : "Login"}</h3>
          <div className="input-group mb-2">
            <input
              className="form-control"
              type="text"
              id="userId"
              value={userId}
              onChange={handleChange}
              placeholder="userId"
            ></input>
          </div>
          <div className="input-group mb-2">
            <input
              className="form-control"
              type="password"
              id="password"
              value={password}
              onChange={handleChange}
              placeholder="Password"
            ></input>
          </div>
          {showSignup && (
            <>
              <div className="input-group mb-2">
                <input
                  className="form-control"
                  type="text"
                  id="userName"
                  value={userName}
                  onChange={handleChange}
                  placeholder="Username"
                ></input>
              </div>
              <div className="input-group mb-2">
                <input
                  className="form-control"
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Email"
                ></input>
              </div>
              <div className="d-flex justify-content-center mb-2">
                <DropdownButton
                  title={userType}
                  id="userType"
                  variant="light"
                  onSelect={changeUserType}
                >
                  <Dropdown.Item eventKey="CUSTOMER">CUSTOMER</Dropdown.Item>
                  <Dropdown.Item eventKey="ENGINEER">ENGINEER</Dropdown.Item>
                  <Dropdown.Item eventKey="ADMIN">ADMIN</Dropdown.Item>
                </DropdownButton>
              </div>
            </>
          )}
          <div className="input-group mb-2">
            <input
              className="btn btn-primary form-control"
              type="submit"
              value={showSignup ? "Sign up" : "Log in"}
            ></input>
          </div>
          <div
            className="text-info text-center"
            onClick={toggleSignup}
            style={{ cursor: "pointer" }}
          >
            {showSignup
              ? "Already have an account ? Signin"
              : "Don't have an Account ? Signup"}
          </div>
          <div
            className={`d-flex justify-content-center align-items-center  ${
              error ? "text-danger" : "text-success"
            }`}
          >
            {message}
          </div>
        </form>
      </div>
    </div>
  );
}
