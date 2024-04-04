import React, { useState } from "react";
import "./LoginPage.css";
import toast from "react-hot-toast";

const LoginPage = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:4000/api/login", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(formData));
    xhr.onload = () => {
      if (xhr.status === 200) {
        toast.success("Login Successful");
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
      </div>
    </>
  );
};

export default LoginPage;
