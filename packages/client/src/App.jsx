import "./App.css";
import Homepage from "./components/page/homepage";
import { Route, Routes } from "react-router-dom";
import Menupage from "./components/page/menuPage";
import BookingTablePage from "./components/page/BookingTablePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/BookingTablePage" element={<BookingTablePage />} />
      <Route path="/menuPage" element={<Menupage />} />
    </Routes>
  );
}

export default App;
