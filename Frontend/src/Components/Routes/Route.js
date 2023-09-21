import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from '../Sign-in-Page/Signin';
import Registration from '../Sign-up-Page/Signup';
// import SuperAdminLogin from "../Authorization/SuperAdmin-Login";
// import AdminLogin from "../Authorization/Admin_Login";

function Router() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/register" element={<Registration />} /> 
        {/* <Route path="/superadmin" element={<SuperAdminLogin />} /> 
        <Route path="/admin" element={<AdminLogin />} />  */}
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default Router;
