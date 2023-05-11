import './App.css';
import Login from './Pages/Login';
import Admin from './Pages/Admin';
import Engineer from './Pages/Engineer';
import Customer from './Pages/Customer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/Customer' element={<Customer />} ></Route>
          <Route path='/Engineer' element={<Engineer />}></Route>
          <Route path='/Admin' element={<Admin />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
