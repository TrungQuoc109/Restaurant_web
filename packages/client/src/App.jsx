import "./App.css";
import ResponsiveAppBar from "./components/Nav-bar";
import AutoScrollingBanner from "./components/banners";
import ProductGrid from "./components/Introducing_products";
import Footer from "./components/footer";

function App() {
  return (
    <>
      <ResponsiveAppBar />
      <AutoScrollingBanner />
      <ProductGrid />
      <Footer />
    </>
  );
}

export default App;
