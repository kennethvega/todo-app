import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { auth } from "./config/firebase-config";
import { useAtom } from "jotai";
import { authAtom } from "../atoms";
import { onAuthStateChanged } from "firebase/auth";
function App() {
  const [isAuth, setIsAuth] = useAtom(authAtom);
  // check if authentication is ready
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsAuth(true);
      unsub();
    });
  }, [auth]);
  return (
    <>
      {isAuth && ( //only show something after isAuth is true
        <BrowserRouter>
          <Navbar />
          <Routes>
            {/* <Route path="/" element={auth ? <Home /> : <Login />} />
          <Route path="/login" element={!auth ? <Login /> : <Home />} />
          <Route path="/register" element={!auth ? <Signup /> : <Home />} /> */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
