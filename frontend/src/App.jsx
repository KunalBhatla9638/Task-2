import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomeComponent from "./components/HomeComponent/HomeComponent";
import ListComponent from "./components/ListComponent/ListComponent";
import NoFoundComponent from "./components/NoFoundComponent/NoFoundComponent";
import AddComponent from "./components/AddComponent/AddComponent";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index exact path="/" element={<HomeComponent />} />
          <Route path="/list" element={<ListComponent />} />
          <Route path="/add" element={<AddComponent />} />
          <Route path="*" element={<NoFoundComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

