import React from "react";
import { useFormik } from "formik";

function ResetPassword() {
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
          <h2>Reset Password :</h2>
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

          <button type="submit" class="registerbtn">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default ResetPassword;

