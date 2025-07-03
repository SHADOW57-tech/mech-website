import {
  Routes,
  Route,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Pages
import Home from "./pages/Home";
import Parts from "./pages/Parts";
import Book from "./pages/Book";
import Cart from "./pages/Carts";
import CheckOut from "./pages/CheckOut";
import Contact from "./pages/Contact";
import CartSummary from "./components/CartSummary";
import BookingSuccess from "./pages/BookingSuccess";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import BookAndOrder from "./pages/BookAndOrder";
import MyOrders from "./pages/MyOrder";
import SelectPayment from "./pages/SelectPayment";
import Success from "./pages/Success";

// Admin
import AdminDashboard from "./pages/admin/AdminDashBoard";
import AdminOrders from "./pages/admin/AdminOrder";
import AdminLayout from "./layouts/AdminLayout";
import AdminBookings from "./pages/admin/AdminBooking";
import AdminLogin from "./pages/admin/AdminLogin";

// Layouts
import PageWrapper from "./components/PageWrapper";
import FloatingButtons from "./components/FloatButton";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/LoginPage";
import Signup from "./pages/SighUp";

export default function AnimatedRoutes({ location }) {
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <PageWrapper>
              <Home />
              <FloatingButtons />
            </PageWrapper>
          }
        />
        <Route path="/parts" element={<PageWrapper><Parts /></PageWrapper>} />
        <Route path="/book" element={<PageWrapper><Book /></PageWrapper>} />
        <Route path="/checkout" element={<PageWrapper><CheckOut /></PageWrapper>} />
        <Route path="/cart" element={<PageWrapper><Cart /></PageWrapper>} />
        <Route path="/cartsummary" element={<PageWrapper><CartSummary /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="/booking-success" element={<PageWrapper><BookingSuccess /></PageWrapper>} />
        <Route path="/checkout-success" element={<PageWrapper><CheckoutSuccess /></PageWrapper>} />
        <Route path="/book-order" element={<PageWrapper><BookAndOrder /></PageWrapper>} />
        <Route path="/my-orders" element={<PageWrapper><MyOrders /></PageWrapper>} />
        <Route path="/select-payment" element={<PageWrapper><SelectPayment /></PageWrapper>} />
        <Route path="/success" element={<PageWrapper><Success /></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
        <Route path="/signup" element={<PageWrapper><Signup /></PageWrapper>} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route path="login" element={<AdminLogin />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
