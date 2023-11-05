// import React from 'react'
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EditProfile from "./pages/editProfile";
import Auth from "./pages/auth";
import privateRoutes from "./components/privateRoutes";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{ style: { fontSize: "1.5rem" } }}
      ></Toaster>
      
      {/* ROUTES START */}
      {/* PRIVATE ROUTES */}
      <Routes>
        <Route element={privateRoutes}>
          <Route path="/" element={<Home />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          
        </Route>

        {/* PUBLICH ROUTES */}
        <Route path="/*" element={<NotFound />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </>
  );
}

export default App;
