import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ListPage from "./pages/ListPage/ListPage";
import AddPage from "./pages/AddPage/AddPage";
import NoFoundPage from "./pages/NoFoundPage/NoFoundPage";
import UpdatePage from "./pages/UpdatePage/UpdatePage";
import Navbar from "./components/Navbar";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import { Toaster } from "react-hot-toast";
// import HomeComponent from "./pages/HomeComponent/HomeComponent";
// import ListComponent from "./pages/ListComponent/ListComponent";
// import NoFoundComponent from "./pages/NoFoundComponent/NoFoundComponent";
// import AddComponent from "./pages/AddComponent/AddComponent";

function App() {
  return (
    <div>
      <ToastContainer />
      <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
      <Navbar />
      <Routes>
        <Route index exact path="/" element={<HomePage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/add" element={<AddPage />} />
        <Route path="/update" element={<UpdatePage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NoFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;

