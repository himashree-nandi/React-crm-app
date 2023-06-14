import "./App.css";
import Login from "./Pages/Login";
import Admin from "./Pages/Admin";
import Engineer from "./Pages/Engineer";
import Customer from "./Pages/Customer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import Auth from "./HOCs/Auth";
function App() {
  const defaultMaterialTheme = createTheme();
  return (
    <div className="App">
      <ThemeProvider theme={defaultMaterialTheme}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={<Login />}></Route>
            <Route
              path="/customer"
              element={<Auth 
              ><Customer /></Auth>}></Route>
            <Route
              path="/engineer"
              element={<Auth 
              ><Engineer /></Auth>}></Route>
           
              <Route path="/admin/:userId"element={<Auth> <Admin /></Auth>}/>
              
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
