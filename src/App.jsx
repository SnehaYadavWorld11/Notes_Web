import { useState } from "react";
import "./App.css";
import Register from "./components/Register";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import CDash from "./components/CDash";
import Navbar from "./components/Navbar";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <div className="bg-black h-screen text-orange-400 mx-auto ">
          <Navbar/>
          <Routes>
            <Route path="/reg" element={<Register/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/dash" element={<Dashboard/>}></Route>
            <Route path="/" element={<CDash/>}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
