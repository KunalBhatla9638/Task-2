import React, { useState } from "react";
import "./LoginPage.css";

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
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here, such as sending the data to a server
    console.log(formData);
    // Clear form fields after submission
    setFormData({
      uemail: "",
      upassword: "",
    });
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
            value={formData.uemail}
            onChange={handleChange}
            required
          />

          <label htmlFor="upassword">Password:</label>
          <input
            type="password"
            id="upassword"
            name="upassword"
            value={formData.upassword}
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
