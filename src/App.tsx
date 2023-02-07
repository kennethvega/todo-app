import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";

function App() {
  const auth = false;
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={auth ? <Home /> : <Login />} />
          <Route path="/login" element={!auth ? <Login /> : <Home />} />
          <Route path="/register" element={!auth ? <Signup /> : <Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
