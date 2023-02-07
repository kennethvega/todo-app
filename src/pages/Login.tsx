import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/utility/Button";
import Card from "../components/utility/Card";
import { useFormik } from "formik";
import * as Yup from "Yup";
import { useLogin } from "../hooks/useLogin";
import Spinner from "../components/utility/Spinner";

const Login = () => {
  // const [password, setPassword] = useState("");
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
                className="absolute right-3 top-2  text-base"
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
