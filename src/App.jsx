import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import Dashbord from "./components/dashbord";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProductsAsync,
  page,
  toggle,
} from "./redux/product/productSlice";
import Navbar from "./components/navbar";
import Stats from "./components/stats";

function App() {
  const userPage = useSelector(page);
  const dispatch = useDispatch();
  const getAllProducts = () => {
    dispatch(getAllProductsAsync());
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div>
      <Navbar />
      {userPage === "Dashboard" ? <Dashbord /> : <Stats />}
    </div>
  );
}

export default App;
