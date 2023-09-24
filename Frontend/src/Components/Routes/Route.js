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
          localStorage?.getItem("token") !="" && localStorage?.getItem("token") !="undefined" && localStorage?.getItem("token") != null  ? 
          <>
          <Route path="/" element={<Layout />}/>

        <Route path="*" element={<Layout />}/>
        </>
       
          :
          <>
        <Route path="/" element={<Login />} /> 
        <Route path="/register" element={<Registration />} /> 
        <Route path="*" element={<Login />}/>
          </>
        }
      

          </Routes>
     
    </BrowserRouter>
    </div>
  );
}

export default Router;






// import React from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Login from '../Sign-in-Page/Signin';
// import Registration from '../Sign-up-Page/Signup';
// import Layout from '../../Layout/Layout';

// function Router() {
//   const token = localStorage?.getItem("token");

//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={token ? <Layout /> : <Navigate to="/login" />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Registration />} />
//           {token && <Route path="/table" element={<Layout />} />}
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default Router;

