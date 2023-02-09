import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useEffect, useContext } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { auth } from "./config/firebase-config";

import { onAuthStateChanged } from "firebase/auth";
import { UserContext } from "./context/AuthContext";
function App() {
  const { user, isAuth, setUser, setIsAuth } = useContext(UserContext);
  console.log(isAuth);

  return (
    <>
      {isAuth && (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={user ? <Home /> : <Login />} />
            <Route path="/login" element={!user ? <Login /> : <Home />} />
            <Route path="/register" element={!user ? <Signup /> : <Home />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
