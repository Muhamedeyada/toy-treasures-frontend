import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import Profile from "./pages/Profile";
import About from "./pages/About";
import ItemDetails from "./pages/ItemDetails";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SellItem from "./pages/SellItem";
import ContactUs from "./pages/ContactUs";
import SellerContacts from "./pages/SellerContacts";
import ProtectedRoute from "./components/ProtectedRoute";
import UserDashboard from "./Layouts/Profile/UserDashboard";
import AccountDetails from "./Layouts/Profile/AccountDetails";
import UserItems from "./Layouts/Profile/UserItems";
import SwapRequests from "./Layouts/Profile/SwapRequests";
import Wishlist from "./Layouts/Profile/Wishlist";

const AppRoutes = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen justify-between">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
                <Footer />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <Navbar />
                <Profile />
                <Footer />
              </>
            }
          />
          <Route
            path="/shop"
            element={
              <>
                <Navbar />
                <Shop />
                <Footer />
              </>
            }
          />
          <Route
            path="/items/:id"
            element={
              <>
                <Navbar />
                <ItemDetails />
                <Footer />
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <Navbar />
                <Register />
                <Footer />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Navbar />
                <Login />
                <Footer />
              </>
            }
          />
          <Route
            path="/sell-item"
            element={
              <>
                <Navbar />
                <SellItem />
                <Footer />
              </>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRoutes;
