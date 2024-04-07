import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [profile, setProfile] = useState({ profile: "" });

  useEffect(() => {
    const pro = JSON.parse(localStorage.getItem("profile"));
    if (profile == "") {
      setProfile((prev) => ({ ...prev, ...pro }));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile));
  }, [profile]);

  return (
    <UserContext.Provider value={{ profile, setProfile }}>
      {children}
    </UserContext.Provider>
  );
}
