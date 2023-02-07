import { useAtom } from "jotai";
import { auth } from "../config/firebase-config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { userAtom } from "../../atoms";
// import { useDispatch } from "react-redux";
// import { logout } from "../features/authSlice";
// import { toast } from "react-toastify";
export const useLogout = () => {
  const navigate = useNavigate();
  const [, setUserAtom] = useAtom(userAtom);
  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        setUserAtom(null);
        console.log("user signed out");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return { logoutUser };
};
