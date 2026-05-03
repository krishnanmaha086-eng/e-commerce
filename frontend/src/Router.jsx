import { createBrowserRouter } from "react-router-dom";

import Navbar from "./Page1/Header/navbar";
import Hero from "./Page1/Hero/hero";
import CategorySection from "./Page1/features/productFeatures";
import Products from "./Page1/product/products";
import Premium from "./Page1/premium/premium";
import Footer from "./Page1/footer/footer";
import ProductPage from "./Page2/productPage";
import ErrorPage from "./errorMessage";
import CartPage from "./Page3/CartPage";

import Login from "./Auth/Login";
import Register from "./Auth/Register";

import CheckoutPage from "./Page4/CheckoutPage";

const Router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Hero />
        <CategorySection />
        <Products />
        <Premium />
        <Footer />
      </>
    ),
    errorElement: <ErrorPage />
  },

  {
    path: "/products",
    element: (
      <>
        <Navbar />
        <Products />
        <Footer />
      </>
    ),
    errorElement: <ErrorPage />
  },

  {
    path: "/product/:id",
    element: (
      <>
        <Navbar />
        <ProductPage />
        <Footer />
      </>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: "/cart",
    element: (
      <>
        <Navbar />
        <CartPage />
        <Footer />
      </>
    )
  },
  {
    path: "/login",
    element: (
      <>
        <Navbar />
        <Login />
        <Footer />
      </>
    )
  },
  {
    path: "/register",
    element: (
      <>
        <Navbar />
        <Register />
        <Footer />
      </>
    )
  },
  {
    path: "/checkout",
    element: (
      <>
        <Navbar />
        <CheckoutPage />
        <Footer />
      </>
    )
  }
]);

export default Router;