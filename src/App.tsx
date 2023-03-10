import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useContext } from 'react';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Signup from './pages/Signup/Signup';

import { UserContext } from './context/AuthContext';
function App() {
  const { user, isAuth, validateUser } = useContext(UserContext);

  // jest react test, react-hook-form
  // data router -nice to have
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
