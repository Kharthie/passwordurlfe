import React from "react";
import "./Register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { Link } from "react-router-dom";

function Register() {
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phonenumber: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        await axios.post(
          "https://passwordurlbe.herokuapp.com/register",
          values
        );
        navigate("/");
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
          <h2>Register a New Account :</h2>
          <p>Please fill in this form to create an account.</p>
          <hr />
          <label className="form-label">
            <h3>Enter Your  Name</h3>
          </label>
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.name}
            required
          />

          <label className="form-label">
            <h3>Enter Your  Email</h3>
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
            <h3>Enter Your Phone Number</h3>
          </label>
          <input
            type="number"
            name="phonenumber"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.phonenumber}
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
            Register
          </button>
        </div>

        <div class="container signin">
          <p>
            Already have an account? <a></a>
            <Link to={"/"}>
              <h4 className="btn btn-primary">Login</h4>
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

export default Register;

