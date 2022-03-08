import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useState, useEffect } from "react";

function Dashboard() {
  const [urlList, setUrlList] = useState([]);
  useEffect(async () => {
    try {
      let dashboard = await axios.get(
        "https://passwordurlbe.herokuapp.com/dashboard",
        {
          headers: {
            Authorization: window.localStorage.getItem("my_token"),
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchUrls();
  }, []);

  let fetchUrls = async () => {
    try {
      let allUrls = await axios.get(
        "https://passwordurlbe.herokuapp.com/getUrls"
      );
      setUrlList(allUrls.data);
    } catch (error) {
      console.log(error);
    }
  };

  let handleDelete = async (id) => {
    try {
      let result = window.confirm("Are you sure want to delete?");
      if (result) {
        await axios.delete(`https://passwordurlbe.herokuapp.com/url/${id}`);
        fetchUrls();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      url: "",
    },
    onSubmit: async (values) => {
      try {
        axios.post("https://passwordurlbe.herokuapp.com/createUrl", values);
      } catch (error) {
        console.log(error);
      }
      fetchUrls();
    },
  });

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="url-head">
            <h2>U R L - S H O R T E N E R</h2>
          </div>
          <div className="col-lg-1 mt-3">
            <Link to={"/"}>
              <button className="logout">Logout</button>
            </Link>
          </div>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="row col-lg-12 text-center mt-5">
            <div class="submiturl">
              <input
                type="text"
                class="form-control"
                name="url"
                placeholder="Place your url..."
                onChange={formik.handleChange}
                value={formik.values.url}
                required
              />

              <input
                className="submit"
                class="btn btn-primary"
                type="submit"
                id="button-addon2"
              />
            </div>
          </div>
        </form>

        {urlList.map((url, index) => {
          return (
            <div class="d-flex justify-content-center" key={index}>
              <div className="col-lg-10 mt-2">
                <div class="card border-primary mb-4">
                  <div class="card-header">
                    <h3>【 S H O R T E N E D - U R L 】</h3>
                  </div>
                  <div class="card-body text-success">
                    <h5 class="card-title">
                      <a
                        href={url.url}
                        target="_blank"
                      >{`http://localhost:3000/${url.shortUrl}`}</a>
                    </h5>
                    <div className="originalurhead">
                      <h3> 【 O R I G I N A L - U R L 】</h3>
                    </div>
                    <p class="originalurl">{url.url}</p>
                    <button
                      onClick={() => handleDelete(url._id)}
                      className="delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Dashboard;

