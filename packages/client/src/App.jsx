import "./App.css";
import Homepage from "./components/page/homePage";
import { Route, Routes } from "react-router-dom";
import Menupage from "./components/page/menuPage";
import BookingTablePage from "./components/page/bookingtablePage";
import LoginPage from "./components/page/loginPage";
import SignUpPage from "./components/page/signupPage";
import ProductDetailPage from "./components/page/productPage";
import AboutUsPage from "./components/page/aboutrestaurantPage";
import CheckoutPage from "./components/page/checkoutPage";
import UserPage from "./components/page/userPage";
import OrderDetail from "./components/page/orderDetailPage";
import ProductManagementPage from "./components/page/Admin/productManagementPage";
import InvoiceManagementPage from "./components/page/Admin/InvoiceManagementPage";
import UserManagementPage from "./components/page/Admin/UserManagementPage";
import { MenuContextProvider } from "./context/MenuContextProvider";

function App() {
  return (
    <MenuContextProvider>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/BookingTablePage" element={<BookingTablePage />} />
        <Route path="/menuPage" element={<Menupage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/userpage" element={<UserPage />} />
        <Route path="/order/:orderId/:type" element={<OrderDetail />} />
        <Route
          path="/ProductManagementPage"
          element={<ProductManagementPage />}
        />
        <Route
          path="/InvoiceManagementPage"
          element={<InvoiceManagementPage />}
        />
        <Route path="/UserManagementPage" element={<UserManagementPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Routes>
    </MenuContextProvider>
  );
}

export default App;
