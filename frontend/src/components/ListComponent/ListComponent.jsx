import React from "react";
import { useEffect, useState } from "react";

const API = "http://localhost:4000/api/books";

function ListComponent() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const deleteRecord = (id) => {
    const result = confirm(`Do you want to delete id : ${id}`);
    if (result) {
      const xhr = new XMLHttpRequest();
      xhr.open("DELETE", `http://localhost:4000/api/deletebook/${id}`, true);
      xhr.onload = () => {
        if (xhr.status === 200) {
          console.log("Deleted Successfully");
          fetchBooks(API);
        } else if (xhr.status === 404) {
          console.log("Book have the author you can't delete");
        } else {
          console.log("Deleted unsuccessfully");
        }
      };
      xhr.send();
    } else {
      console.log("Deletion operation aborted");
    }
  };

  return (
    <>
      {loading && <h1>Loading...</h1>}
      {/* <button onClick={onClick}>HttpXML</button> */}
      <table>
        <thead>
          {!loading && (
            <tr>
              <th>books_id</th>
              <th>title</th>
              <th>description</th>
              <th>publish_year</th>
              <th>quantity</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          )}
        </thead>
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
                  <button className="update-btn">Update</button>
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
    </>
  );
}

export default ListComponent;
