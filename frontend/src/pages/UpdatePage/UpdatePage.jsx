import React from "react";
import { useState } from "react";
import "./UpdatePage.css";

const UpdatePage = () => {
  const [allInputFields, setAllInputFields] = useState({
    title: "",
    description: "",
    publish_year: "",
    quantity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAllInputFields({ ...allInputFields, [name]: value });
  };

  const handleSubmit = (e) => {
    console.log(allInputFields);
    e.preventDefault();
    const { title, description, publish_year, quantity } = allInputFields;
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:4000/api/insertbook", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onprogress = () => {
      console.log("On Progress...!");
    };
    xhr.onload = () => {
      if (xhr.status === 200) {
        console.log("Data Inserted Successfully");
        setAllInputFields({
          title: "",
          description: "",
          publish_year: "",
          quantity: "",
        });
      } else {
        console.log("Enter all Fields", xhr.statusText);
      }
    };
    // xhr.send(JSON.stringify(allInputFields));
    xhr.send(JSON.stringify({ title, description, publish_year, quantity }));
  };

  return (
    <>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <div className="update-div">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={allInputFields.title}
              onChange={handleChange}
            />
            <label>Description:</label>
            <textarea
              name="description"
              cols={10}
              rows={10}
              value={allInputFields.description}
              onChange={handleChange}
            />

            <label>Publish Year:</label>
            <input
              type="text"
              name="publish_year"
              value={allInputFields.publish_year}
              onChange={handleChange}
            />

            <label>Quantity:</label>
            <input
              type="text"
              name="quantity"
              value={allInputFields.quantity}
              onChange={handleChange}
            />
            <button type="submit" className="edit-btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdatePage;
