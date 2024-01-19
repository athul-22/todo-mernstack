// import React from 'react'
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EditProfile from "./pages/editProfile";
import PrivateRoutes from "./components/PrivateRoutes.jsx"
import NotFound from "./pages/NotFound";
import Login from './components/auth/Login'
import Register from './components/auth/Register';
import Test from './TEST/Testing.jsx'

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{ style: { fontSize: "1rem" } }}
      ></Toaster>
      
      {/* ROUTES START */}
      {/* PRIVATE ROUTES */}
      <Routes>
        <Route element={<PrivateRoutes/>}>
          <Route path="/" element={<Home />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Route>

        {/* PUBLICH ROUTES */}
        <Route path="/*" element={<NotFound />} />
        {/* <Route path="/auth" element={<Auth />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </>
  );
}


export default App;
