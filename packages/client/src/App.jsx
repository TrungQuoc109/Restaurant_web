import "./App.css";
import Homepage from "./components/page/homepage";
import Datbanpage from "./components/page/datbanPage";
import { Route, Routes } from "react-router-dom";
import Menupage from "./components/page/menuPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/datbanPage" element={<Datbanpage />} />
      <Route path="/menuPage" element={<Menupage />} />
    </Routes>
  );
}

export default App;
