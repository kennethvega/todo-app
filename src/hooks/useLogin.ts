import { useAtom } from "jotai";
import { useState } from "react";
import { auth } from "../config/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { userAtom } from "../../atoms";

export const useLogin = () => {
  const navigate = useNavigate();
  const [, setUserAtom] = useAtom(userAtom);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const loginUser = async (email: string, password: string) => {
    setError(null);
    setIsPending(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setUserAtom(res.user);
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
