import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from '../Sign-in-Page/Signin';
import Registration from '../Sign-up-Page/Signup';
import Layout from '../../Layout/Layout';
//import MyTable from '../Users-Portal/Projectdetails/Project';
function Router() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/register" element={<Registration />} /> 
        <Route path="/table" element={<Layout />} />
      

          </Routes>
     
    </BrowserRouter>
    </div>
  );
}

export default Router;
