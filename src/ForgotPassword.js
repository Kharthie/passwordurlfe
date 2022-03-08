import React from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      try {
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <form action="action_page.php" onSubmit={formik.handleSubmit}>
        <div class="container">
          <h1>U R L - S H O R T E N E R</h1>
          <h2>Forgot Password :</h2>
          <p>Please fill in this form.</p>
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

          <hr />

          <Link to={"/register"}>
            <h3 className="registerbtn">Submit</h3>
          </Link>
        </div>
      </form>
    </>
  );
}

export default ForgotPassword;

