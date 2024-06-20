import React, { useEffect, useState } from "react";
import Signup from "./auth/signup/SignUp";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./auth/login/Login";
// import Donormain from "./Donor/DonorMain";
import ResponsiveAppBar from "./components/naigationBar/Navigation";
import Donormain from "./Donor/DonorMain";
import DonateFood from "./Donor/DonateFood/DonateFood";
import FeedBack from "./Donor/feedBacks/FeedBack";
import Reciver from "./reciver/Reciver";
import NGOClaimForm from "./reciver/request/NGOClaimForm";
import PastOrders from "./reciver/pasthistory.jsx/PastOrders";
import Donation from "./components/donation/Donation";
import Delvery from "./delivery/Delvery";
import Orders from "./delivery/pastDelivery/Orders";
// import PastHistory from "./Donor/pastHistory/PastHistory";
import Home from "./pages/home/Home";
import PastHistory from "./Donor/pastDonations/PastHistory";
import axios from "axios";
import { baseUrl } from "./utils/Api";
import About from "./pages/about/About";
// import PostFood from "./Donor/postFood/postFood";

const App = () => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
      console.log("User fetched successfully:", response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div>
      <ResponsiveAppBar />
      {/* <Signup /> */}

      {/* <Donormain /> */}
      <Routes>
        <Route path="/signup" element={<Signup />} />

        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Home />} />

        <Route path="/donor" element={user && <Donormain />} />

        <Route path="/postFood" element={user && <DonateFood />} />

        <Route path="/feedback" element={user && <FeedBack />} />

        <Route path="/PastHistory" element={user && <PastHistory />} />

        <Route path="/reciver" element={user && <Reciver />} />

        <Route path="/request" element={user && <NGOClaimForm />} />

        <Route path="/past-requests" element={user && <PastOrders />} />

        <Route path="/donation/:id" element={user && <Donation />} />

        <Route path="/delivery" element={user && <Delvery />} />

        <Route path="/orders" element={user && <Orders />} />

        <Route path="/about" element={<About />} />

        {user && user.role === "DONOR" && <Donormain />}
        {user && user.role === "DELEVERY_AGENT" && <Delvery />}
        {user && user.role === "RECIPIENT" && <Reciver />}
      </Routes>
    </div>
  );
};

export default App;
