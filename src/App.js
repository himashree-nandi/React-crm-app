import "./App.css";
import Login from "./Pages/Login";
import Admin from "./Pages/Admin";
import Engineer from "./Pages/Engineer";
import Customer from "./Pages/Customer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import Auth from "./HOCs/Auth";
import React, { useState } from "react";
const ThemeContext=React.createContext()

function App() {
  const defaultMaterialTheme = createTheme();
  const [theme,setTheme]=useState("light")
  return (
    <div className="App">
      <ThemeProvider theme={defaultMaterialTheme}>
        <ThemeContext.Provider value={{theme,setTheme}}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route
              path="/customer/createTicket"
              element={
                <Auth>
                  <Customer />
                </Auth>
              }
            />
            <Route
              path="/customer"
              element={
                <Auth>
                  <Customer />
                </Auth>
              }
            ></Route>
            <Route
              path="/engineer"
              element={
                <Auth>
                  <Engineer />
                </Auth>
              }
            ></Route>
            <Route
              path="/admin"
              element={
                <Auth>
                  <Admin />
                </Auth>
              }
            />
            <Route
              path="/admin/:userId"
              element={
                <Auth>
                  <Admin />
                </Auth>
              }
            />
          </Routes>
        </Router>
        </ThemeContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
export{ThemeContext}