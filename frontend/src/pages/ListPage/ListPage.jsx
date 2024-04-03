import React from "react";
import { useEffect, useState } from "react";
import "./ListPage.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API = "http://localhost:4000/api/books";

function ListComponent() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateCardView, setUpdateCardView] = useState(false);
  const [id, setId] = useState(-1);

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

  const fetchBooks = async (api) => {
    try {
      const response = await fetch(API);
      const data = await response.json();
      setBooks(data);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchBooks(API);
  }, []);

  // const onClick = () => {
  //   let xhr = new XMLHttpRequest();
  //   xhr.open("GET", API, true);
  //   xhr.onload = () => {
  //     if (xhr.status >= 200 && xhr.status < 300) {
  //       const books = JSON.parse(xhr.responseText);
  //       setBooks(books);
  //     } else {
  //       console.error("Request failed with status:", xhr.status);
  //     }
  //   };
  //   xhr.send(null);
  // };

  const updateRecord = (id) => {
    const idx = books.findIndex((item) => item.books_id === id);
    const book = books[idx];
    const { title, description, publish_year, quantity } = book;
    setAllInputFields({
      title: title,
      description: description,
      publish_year: publish_year,
      quantity: quantity,
    });
    setId(id);
    setUpdateCardView(true);
  };

  const deleteRecord = (id) => {
    const result = confirm(`Do you want to delete id : ${id}`);
    if (result) {
      const xhr = new XMLHttpRequest();
      xhr.open("DELETE", `http://localhost:4000/api/deletebook/${id}`, true);
      xhr.onload = () => {
        if (xhr.status === 200) {
          console.log("Deleted Successfully");
          fetchBooks(API);
          toast.success("🦄 Wow so easy!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        } else if (xhr.status === 404) {
          console.log("Book have the author you can't delete");
        } else {
          toast.error("🦄 Wow so easy!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
          console.log("Deleted unsuccessfully");
        }
      };
      xhr.send();
    } else {
      console.log("Deletion operation aborted");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const xhr = new XMLHttpRequest();
    xhr.open("PATCH", `http://localhost:4000/api/updatebook/${id}`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onprogress = () => {
      console.log("On Progress...!");
    };
    xhr.onload = () => {
      if (xhr.status === 200) {
        console.log("Data Updated Successfully");
        setAllInputFields({
          title: "",
          description: "",
          publish_year: "",
          quantity: "",
        });
        fetchBooks();
        setUpdateCardView(false);
      } else {
        console.log("Enter all Fields", xhr.statusText);
      }
    };
    xhr.send(JSON.stringify(allInputFields));
    // xhr.send(JSON.stringify({ title, description, publish_year, quantity }));
  };

  const closeForm = () => {
    setUpdateCardView(false);
  };

  return (
    <div>
      {loading && <h1>Loading...</h1>}
      {updateCardView && (
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
                cols={60}
                rows={3}
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
              <button type="submit" className="close-btn" onClick={closeForm}>
                Close
              </button>
            </div>
          </form>
        </div>
      )}
      {/* <button onClick={onClick}>HttpXML</button> */}
      <table>
        {!loading && (
          <thead>
            <tr>
              <th>books_id</th>
              <th>title</th>
              <th>description</th>
              <th>publish_year</th>
              <th>quantity</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
        )}
        <tbody>
          {books.map((item, idx) => {
            const { books_id, title, description, publish_year, quantity } =
              item;
            return (
              <tr key={idx}>
                <td>{books_id}</td>
                <td>{title}</td>
                <td>{description}</td>
                <td>{publish_year}</td>
                <td>{quantity}</td>
                <td>
                  <button
                    className="update-btn"
                    onClick={() => {
                      console.log(books_id);
                      updateRecord(books_id);
                    }}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteRecord(books_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ListComponent;
