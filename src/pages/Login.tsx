import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/utility/Button";
import Card from "../components/utility/Card";
import { useFormik } from "formik";
import * as Yup from "Yup";
import { useLogin } from "../hooks/useLogin";
import Spinner from "../components/utility/Spinner";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../config/firebase-config";
import { FcGoogle } from "react-icons/fc";
import { UserContext } from "../context/AuthContext";

const Login = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser, error, isPending } = useLogin();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // validate form
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters "),
    }),

    // submit form
    onSubmit: (values) => {
      console.log(values);
      const { email, password } = values;
      loginUser(email, password);
    },
  });

  // google sign in
  const handleGoogleSignIn = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const googleAuthProvider = new GoogleAuthProvider();
      await signInWithPopup(auth, googleAuthProvider).then((userCredential) => {
        setUser(userCredential.user);
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-3 p-3">
      <Card>
        <h2 className="mb-5 font-bold text-2xl text-green">Login</h2>
        <form onSubmit={formik.handleSubmit} className="max-w-[20rem] ">
          <label
            className={`text-sm ${
              formik.touched.email && formik.errors.email ? "text-red" : ""
            }`}
          >
            {formik.touched.email && formik.errors.email
              ? formik.errors.email
              : "Email"}
          </label>
          <input
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            type="text"
            placeholder="Email"
            onBlur={formik.handleBlur}
            className="mb-3 mt-1"
          />
          <label
            className={`text-sm ${
              formik.touched.password && formik.errors.password
                ? "text-red"
                : ""
            }`}
          >
            {formik.touched.password && formik.errors.password
              ? formik.errors.password
              : "Password"}
          </label>
          <div className="relative flex items-center">
            <input
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onBlur={formik.handleBlur}
              className="mb-3 mt-1"
            />
            {formik.values.password.length > 0 && (
              <button
                type="button"
                className="absolute right-3 top-2  text-base text-green"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            )}
          </div>
          {error && <p className="text-red">{error}</p>}
          <div className="mt-5">
            {isPending ? (
              <Button>
                <Spinner />
              </Button>
            ) : (
              <Button type="submit">Login</Button>
            )}
          </div>
        </form>
        <div className="flex items-center my-6">
          <div className="flex-1 border border-gray"></div>
          <span className="text-sm mx-4 font-semibold text-gray">OR</span>
          <div className="flex-1 border border-gray"></div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="border border-gray hover:shadow-md transition-all duration-300 py-2 px-5 rounded-md flex justify-center gap-3 text-base items-center w-full"
        >
          <FcGoogle className="text-xl" /> Sign in with google
        </button>
      </Card>
      <div className="mt-6">
        <Card>
          <p className="text-center">
            Don't have an account ?{" "}
            <span className="font-bold text-green">
              <Link to="/register">Sign up</Link>
            </span>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Login;
