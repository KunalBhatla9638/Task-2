import React, { useContext, useState } from "react";
import "./LoginPage.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";

const LoginPage = () => {
  const { setProfile } = useContext(UserContext);
  const [formData, setFormData] = useState({
    uemail: "",
    upassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:4000/api/login", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.withCredentials = true;
    xhr.send(JSON.stringify(formData));
    xhr.onload = () => {
      if (xhr.status === 200) {
        toast.success("Login Successful");
        const userObj = JSON.parse(xhr.responseText);
        const userImage = userObj.user.uprofilepic;
        setProfile(userImage);
        navigate("/list");
      } else if (xhr.status === 404) {
        // const error = JSON.parse(xhr.responseText);
        toast.error(JSON.parse(xhr.responseText).error);
      } else if (xhr.status === 500) {
        toast.error(JSON.parse(xhr.responseText).error);
      } else {
        toast.error(JSON.parse(xhr.responseText).error);
      }
    };
    // xhr.send(formData);

    // Clear form fields after submission
    // setFormData({
    //   uemail: "",
    //   upassword: "",
    // });
  };

  return (
    <>
      <div className="container">
        <h2>User Login Form</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="uemail">Email:</label>
          <input
            type="email"
            id="uemail"
            name="uemail"
            // value={formData.uemail}
            onChange={handleChange}
            required
          />

          <label htmlFor="upassword">Password:</label>
          <input
            type="password"
            id="upassword"
            name="upassword"
            // value={formData.upassword}
            onChange={handleChange}
            required
          />

          <input type="submit" value="Submit" />
        </form>
        <p>
          You don't have an account.
          <a href="/registration">Create one</a>.
        </p>
      </div>
    </>
  );
};

export default LoginPage;
