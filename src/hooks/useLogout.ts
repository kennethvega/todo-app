import { UserContext } from "./../context/AuthContext";
import { auth } from "../config/firebase-config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

export const useLogout = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        console.log("user signed out");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return { logoutUser };
};
