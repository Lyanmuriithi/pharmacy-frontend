import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./component/layout";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Contact from "./pages/contact";
import Product from "./pages/product";
import Sales from "./pages/sales";


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product" element={<Product />} />
          <Route path="/sales" element={<Sales />} />
         
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
