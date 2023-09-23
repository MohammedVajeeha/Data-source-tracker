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
      
        {
          localStorage?.getItem("token") !="" && localStorage?.getItem("token") !="undefined"  ? 
        <Route path="/" element={<Layout />} />
          :
          <>
        <Route path="/" element={<Login />} /> 
        <Route path="/register" element={<Registration />} /> 
          </>
        }
      

          </Routes>
     
    </BrowserRouter>
    </div>
  );
}

export default Router;
