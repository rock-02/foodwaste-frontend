import React from "react";
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
// import PostFood from "./Donor/postFood/postFood";

const App = () => {
  return (
    <div>
      <ResponsiveAppBar />
      {/* <Signup /> */}

      {/* <Donormain /> */}
      <Routes>
        <Route path="/signup" element={<Signup />} />

        <Route path="/login" element={<Login />} />

        <Route path="/home" element={<Home />} />

        <Route path="/donor" element={<Donormain />} />

        <Route path="/postFood" element={<DonateFood />} />

        <Route path="/feedback" element={<FeedBack />} />

        <Route path="/PastHistory" element={<PastHistory />} />

        <Route path="/reciver" element={<Reciver />} />

        <Route path="/request" element={<NGOClaimForm />} />

        <Route path="/past-requests" element={<PastOrders />} />

        <Route path="/donation/:id" element={<Donation />} />

        <Route path="/delivery" element={<Delvery />} />

        <Route path="/orders" element={<Orders />} />
      </Routes>
    </div>
  );
};

export default App;
