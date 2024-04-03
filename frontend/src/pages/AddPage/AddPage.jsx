import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddPage.css";

function AddComponent() {
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
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={allInputFields.title}
              onChange={handleChange}
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              cols={60}
              rows={5}
              value={allInputFields.description}
              onChange={handleChange}
            />
          </label>
          <label>
            Publish Year:
            <input
              type="text"
              name="publish_year"
              value={allInputFields.publish_year}
              onChange={handleChange}
            />
          </label>
          <label>
            Quantity:
            <input
              type="text"
              name="quantity"
              value={allInputFields.quantity}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default AddComponent;
