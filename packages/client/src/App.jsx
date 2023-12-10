import "./App.css";
import Homepage from "./components/page/homepage";
import { Route, Routes } from "react-router-dom";
import Menupage from "./components/page/menuPage";
import BookingTablePage from "./components/page/BookingTablePage";
import LoginPage from "./components/page/loginPage";
import SignUpPage from "./components/page/signupPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/BookingTablePage" element={<BookingTablePage />} />
      <Route path="/menuPage" element={<Menupage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
}

export default App;
