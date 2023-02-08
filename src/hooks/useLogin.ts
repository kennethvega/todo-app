import { UserContext } from "./../context/AuthContext";
import { useContext, useState } from "react";
import { auth } from "../config/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const loginUser = async (email: string, password: string) => {
    setError(null);
    setIsPending(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setUser(res.user);
        setIsPending(false);
        setError(null);
        navigate("/");
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  };
  return { loginUser, error, isPending };
};
