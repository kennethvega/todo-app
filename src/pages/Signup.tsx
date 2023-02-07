import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/utility/Button";
import Card from "../components/utility/Card";
import { useFormik } from "formik";
import * as Yup from "Yup";
import { useSignup } from "../hooks/useSignup";
import Spinner from "../components/utility/Spinner";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../config/firebase-config";
import { useAtom } from "jotai";
import { userAtom } from "../../atoms";

const Signup = () => {
  const [, setUserAtom] = useAtom(userAtom);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { signUp, error, isPending } = useSignup();

  const formik = useFormik({
    initialValues: {
      displayName: "",
      email: "",
      password: "",
    },
    // validate form
    validationSchema: Yup.object({
      displayName: Yup.string()
        .max(20, "Display name must be 20 characters or less")
        .min(3, "Display name must be at least 3 characters ")
        .required("Display name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
    }),

    // submit form
    onSubmit: (values) => {
      const { email, password, displayName } = values;
      signUp(email, password, displayName);
    },
  });

  // google sign in
  const handleGoogleSignIn = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const googleAuthProvider = new GoogleAuthProvider();
      await signInWithPopup(auth, googleAuthProvider).then((userCredential) => {
        setUserAtom(userCredential.user);
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-3 p-3">
      <Card>
        <h2 className="mb-5 font-bold text-2xl text-green">Signup</h2>
        <form onSubmit={formik.handleSubmit} className="max-w-[20rem] ">
          <label
            className={`text-sm ${
              formik.touched.displayName && formik.errors.displayName
                ? "text-red"
                : ""
            }`}
          >
            {formik.touched.displayName && formik.errors.displayName
              ? formik.errors.displayName
              : "Display name"}
          </label>
          <input
            name="displayName"
            value={formik.values.displayName}
            onChange={formik.handleChange}
            type="text"
            placeholder="Display name"
            onBlur={formik.handleBlur}
          />

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
            />
            {formik.values.password.length > 0 && (
              <button
                type="button"
                className="absolute right-3 top-2  text-small"
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
              <Button type="submit">Signup</Button>
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
            Already have an account ?{" "}
            <span className="font-bold text-green">
              <Link to="/login">Login</Link>
            </span>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
