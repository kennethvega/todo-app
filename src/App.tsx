import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { auth } from "./config/firebase-config";
import { useAtom } from "jotai";
import { authAtom, userAtom } from "../atoms";
import { onAuthStateChanged } from "firebase/auth";
function App() {
  const [isAuth, setIsAuth] = useAtom(authAtom);
  const [userValue, setUserValue] = useAtom(userAtom);
  console.log(userValue);
  console.log(isAuth);
  // check if authentication is ready
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsAuth(true);
      setUserValue(user);
      unsub();
    });
  }, [auth]);

  return (
    <>
      {isAuth && ( //only show something after isAuth is true
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={userValue ? <Home /> : <Login />} />
            <Route path="/login" element={!userValue ? <Login /> : <Home />} />
            <Route
              path="/register"
              element={!userValue ? <Signup /> : <Home />}
            />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
