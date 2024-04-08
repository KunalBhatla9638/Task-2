import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [profile, setProfile] = useState();

  // useEffect(() => {
  //   const pro = JSON.parse(localStorage.getItem("profile"));
  //   if (profile == "") {
  //     setProfile((prev) => ({ ...prev, ...pro }));
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("profile", JSON.stringify(profile));
  // }, [profile]);

  const fetchBooks = () => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:4000/api/profile", true);
    xhr.withCredentials = true;
    xhr.onload = () => {
      if (xhr.status === 401) {
        console.log("I am here");
        // navigate("/login");

        setLoading(true);
        // navigate("*");
      } else if (xhr.status === 404) {
        // setLoading(false);
        toast.error(JSON.parse(xhr.responseText));
      } else if (xhr.status >= 200 && xhr.status < 300) {
        const profile = JSON.parse(xhr.responseText);

        setProfile(profile);
      } else {
        console.error("Request failed with status:", xhr.status);
      }
    };
    xhr.send(null);
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <UserContext.Provider value={{ profile, setProfile }}>
      {children}
    </UserContext.Provider>
  );
}
