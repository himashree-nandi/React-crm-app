import "./App.css";
import Login from "./Pages/Login";
import Admin from "./Pages/Admin";
import Engineer from "./Pages/Engineer";
import Customer from "./Pages/Customer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";

function App() {
  const defaultMaterialTheme = createTheme();

  return (
    <div className="App">
      <ThemeProvider theme={defaultMaterialTheme}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/customer" element={<Customer />}></Route>
            <Route path="/engineer" element={<Engineer />}></Route>
            <Route path="/admin" element={<Admin />}></Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
