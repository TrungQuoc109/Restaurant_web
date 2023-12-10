import "./App.css";
import Homepage from "./components/page/homepage";
import { Route, Routes } from "react-router-dom";
import Menupage from "./components/page/menuPage";
import BookingTablePage from "./components/page/BookingTablePage";
import LoginPage from "./components/page/loginPage";
import SignUpPage from "./components/page/signupPage";
import ProductDetailPage from "./components/page/productPage";
import AboutUsPage from "./components/page/aboutrestaurantPage";
const products = [
  {
    id: 1,
    category: "lau",
    name: "LẨU VỊT NẤU CHAO",
    descriptive: "Description product.",
    price: "348,000₫",
    image: "/image/produce/lau/lau_vit_chao.jpg",
  },
  {
    id: 2,
    category: "nuong",
    name: "BÊ XÀO SẢ ỚT TÁI CHANH HẤP GỪNG",
    descriptive: "Description product.",
    price: "198,000₫",
    image: "/image/produce/Nướng/BÊ XÀO SẢ ỚT-TÁI CHANH-HẤP GỪNG.jpg",
  },
  {
    id: 3,
    category: "cuon",
    name: "BÒ LÁ LỐT CUỐN BÁNH HỎI",
    descriptive: "Description product.",
    price: "148,000₫",
    image: "/image/produce/Cuốn/BÒ LÁ LỐT CUỐN BÁNH HỎI.jpg",
  },
];
function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/BookingTablePage" element={<BookingTablePage />} />
      <Route path="/menuPage" element={<Menupage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/aboutus" element={<AboutUsPage />} />
      <Route
        path="/product/:id"
        element={<ProductDetailPage products={products} />}
      />
    </Routes>
  );
}

export default App;
