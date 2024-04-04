import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/getProfile");
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (err) {
      console.log("Error : ", err.message);
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUserData;
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
