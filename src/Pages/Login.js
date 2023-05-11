import React from 'react'
import { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { userSignIn, userSignup } from '../api/auth';
export default function Login() {
  const [showSignup, setshowSignup] = useState(false);
  const [userType, setUsertype] = useState("CUSTOMER");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");


  /*function handleChange(e) {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value }
    })
  }*/
  function changeUserType(e) {
    setUsertype(e)
  }
  //---- onChange event handler for all inputs---------
  function handleChange(e) {
    const id = e.target.id;
    if (id === "name") {
      setname(e.target.value);
    } else if (id === "password") {
      setPassword(e.target.value);
    } else if (id === "userName") {
      setUserName(e.target.value);
    } else {
      setEmail(e.target.value);
    };
  }

  /*---------------On Submit function for Signin page------------*/
  function onSubmitSignup(e) {
    const data = {
      name: name,
      userName: userName,
      email: email,
      password: password,
      userType: userType

    }
    e.preventDefault();
    //------Validation-------------
    if (name.length < 5) {
      setError(true);
      setMessage("name should of 5 to 15 character");
      return;
    } else if (password.length < 8) {
      setError(true);
      setMessage("Password (6 or more characters)")
      return
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
    userSignup(data)
      .then(res => {
        console.log(res)
        setError(false);
        setMessage("SignUp successful");
        window.location.href = "/";
      })
      .catch((err) => {
        /*if (err.response.status === 400) {
          setError(true);
          setMessage(err.response.data.message);
        }*/
        console.log(err)
      })

  }

  function onSubmitLogin(e) {
    const data = { userName, password };
    e.preventDefault();
    userSignIn(data)
      .then((res) => {
        console.log(res)
        setError(false);
        setMessage("LogIn successful")
        if (res.data.setUsertype === "CUSTOMER") {
          window.location.href = "/Customer"
        } else if (res.data.setUsertype === "ENGINEER") {
          window.location.href = "/Engineer"
        } else if (res.data.setUsertype === "ADMIN") {
          window.location.href = "/Admin"
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setError(true)
          setMessage(err.response.data.message)
        }
      })
  }

  // Clear the input 
  const clearState = () => {
    setname("");
    setEmail("");
    setUserName("");
    setPassword("");
    setError(false);
    setMessage("");
  }

  //-----onClick event for change the login page and signIn page----
  const toggleSignup = () => {
    clearState();
    setshowSignup(!showSignup)
  }
  return (
    <div className=' align-items-center justify-content-center d-flex vh-100' style={{
      background: "linear-gradient(150deg,blue,black)"
    }}>
      <div className='card p-3 m-3 rounded shadow' style={{ width: 30 + "rem" }} >
        <form onSubmit={showSignup ? onSubmitSignup : onSubmitLogin}>
          <h3 className='text-center'>{showSignup ? "Sign up" : "Login"}</h3>
          <div className='input-group mb-2'>
            <input className='form-control' type='text' id='name' value={name} onChange={handleChange} placeholder='Name'></input>
          </div>
          <div className='input-group mb-2'>
            <input className='form-control' type='password' id='password' value={password} onChange={handleChange} placeholder='Password'></input>
          </div>
          {showSignup &&
            <>
              <div className='input-group mb-2'>
                <input className='form-control' type='text' id='userName' value={userName} onChange={handleChange} placeholder='Username'></input>
              </div>
              <div className='input-group mb-2'>
                <input className='form-control' type='email' id='email' value={email} onChange={handleChange} placeholder='Email'></input>
              </div>
              <div className="d-flex justify-content-center mb-2">
                <DropdownButton title={userType} id='userType' variant="light" value={userType} onSelect={changeUserType} >
                  <Dropdown.Item eventKey="CUSTOMER">CUSTOMER</Dropdown.Item>
                  <Dropdown.Item eventKey="ENGINEER">ENGINEER</Dropdown.Item>
                  <Dropdown.Item eventKey="ADMIN">ADMIN</Dropdown.Item>

                </DropdownButton>
              </div>
            </>
          }
          <div className='input-group mb-2'>
            <input className='btn btn-primary form-control' type='submit' value={showSignup ? "Sign up" : "Log in"}></input></div>
          <div className='text-info text-center' onClick={toggleSignup} style={{ cursor: "pointer" }}>
            {showSignup ? "Already have an account ? Signin" : "Don't have an Account ? Signup"}
          </div>
          <div className={error ? "text-danger" : "text-success"}>{message}</div>
        </form>
      </div>
    </div>
  )
}

