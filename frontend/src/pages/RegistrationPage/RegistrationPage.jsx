import "./RegistrationPage.css";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import React, { useState } from "react";
const RegistrationPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    uname: "",
    uemail: "",
    upassword: "",
    confirmpassword: "",
    uprofilepic: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      uprofilepic: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("uname", formData.uname);
    form.append("uemail", formData.uemail);
    form.append("upassword", formData.upassword);
    form.append("uprofilepic", formData.uprofilepic);

    if (formData.upassword !== formData.confirmpassword) {
      return toast.error("Password not match...!");
    }

    // console.log(formData);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:4000/api/registration", true);
    //xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(form);
    xhr.onload = () => {
      if (xhr.status == 200) {
        toast.success("Inserted Successfully");
        navigate("/login");
      } else if (xhr.status === 409) {
        toast.error("Email is taken already");
      } else if (xhr.status == 400) {
        const error = JSON.parse(xhr.responseText);
        toast.error(error.error);
      } else if (xhr.status == 550) {
        toast.error("Email expression is not valid");
      } else {
        toast.error("Something went wrong");
        console.log(xhr.responseText);
        console.log(xhr.status);
      }
    };

    // console.log(formData.uprofilepic);
    // console.log(formData.uprofilepic);

    // xhr.send(JSON.stringify(formData));
    // xhr.send({ uname, uemail, upassword, uprofilepic });

    // Clear form fields
    setFormData({
      uname: "",
      uemail: "",
      upassword: "",
      uprofilepic: null,
    });
  };

  return (
    <>
      <div className="container">
        <h2>User Registration Form</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label htmlFor="uname">Username:</label>
          <input
            type="text"
            id="uname"
            name="uname"
            value={formData.uname}
            onChange={handleChange}
          />

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
            // value={formData.upassword}
            onChange={handleChange}
            required
          />

          <label htmlFor="confirmpassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmpassword"
            name="confirmpassword"
            // value={formData.confirmpassword}
            onChange={handleChange}
            required
          />

          <label htmlFor="profilepic">Profile Picture:</label>
          <input
            type="file"
            id="profilepic"
            name="uprofilepic"
            onChange={handleFileChange}
            accept="image/*"
          />

          <input type="submit" value="Submit" />
        </form>
        <p>
          Already have an account? <a href="/login">Login</a>.
        </p>
      </div>
    </>
  );
};

export default RegistrationPage;
