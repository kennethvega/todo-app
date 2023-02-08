import Button from "./utility/Button";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useContext } from "react";
import { UserContext } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const { logoutUser } = useLogout();

  return (
    <header className="shadow sticky top-0 bg-white z-50">
      <div className="max-w-[50rem] px-3 mx-auto flex items-center h-16 justify-between">
        <Link to={"/"}>
          <h2 className="text-xl font-extrabold text-green hover:text-green2 transition-all duration-300">
            TODO APP
          </h2>
        </Link>

        <div className="flex gap-6 justify-center items-center">
          {!user ? (
            <>
              <Link to="/login" className="hover:text-green2">
                Login
              </Link>
              <Link to="/register">
                <Button>Sign up </Button>
              </Link>
            </>
          ) : (
            <Button onClick={() => logoutUser()}>Logout</Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
