import React from "react";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        let loginData = await axios.post(
          "https://passwordurlbe.herokuapp.com/login",
          values
        );
        window.localStorage.setItem("my_token", loginData.data.token);
        navigate("/dashboard");
      } catch (error) {
        console.log(error);
      }
    },
  });

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  return (
    <>
      <form action="action_page.php" onSubmit={formik.handleSubmit}>
        <div class="container">
          <h1>U R L - S H O R T E N E R</h1>
          <h2>Login to Your Account :</h2>
          <p>Please fill in this form to Sign-in.</p>
          <hr />

          <label className="form-label">
            <h3>Enter Your Email Id</h3>
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.email}
            required
          />

          <label className="form-label">
            <h3>Enter Your Password</h3>
          </label>
          <input
            type={passwordShown ? "text" : "password"}
            name="password"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.password}
            required
          />

          <span class="p-viewer">
            <i
              onClick={togglePassword}
              class="fa fa-eye"
              aria-hidden="true"
            ></i>
          </span>

          <hr />

          <p>
            By creating an account you agree to our{" "}
            <a href="#">Terms & Privacy</a>.
          </p>
          <button type="submit" class="registerbtn">
            Login
          </button>
        </div>

        <div class="container signin">
          <p>
            Don't have an account? <a></a>
            <Link to={"/register"}>
              <h4 className="btn btn-primary">Register a New Account</h4>
            </Link>
          </p>

          <Link to={"/forgotpassword"}>
            <h4 className="d-flex justify-content-center mb-3">
              Forgot Password?
            </h4>
          </Link>
        </div>
      </form>
    </>
  );
}

export default Login;

