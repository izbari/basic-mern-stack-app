import React, { useEffect } from "react";
import { BrowserRouter as Router, 
   Route,Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import EditMember from "./pages/EditMember";
import Dashboard from "./pages/Dashboard";
import SideBar from "./components/SideBar";
const App = () => {
  const paths = ['/createmember','/login','/editmembers','/dashboard','/'];
 
  return (
    <div>
      <Router>
        {(window.location.pathname != '/login' && window.location.pathname != '/' && paths.includes( window.location.pathname)) && <SideBar />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/createmember" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/editmembers" element={<EditMember />} />
        </Routes>
        </Router>

    </div>
  );
};
export default App;