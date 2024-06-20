import React, { useEffect, useState } from "react";
import { baseUrl } from "../../utils/Api";
import axios from "axios";
import "./orders.css";
import { Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";

const Orders = () => {
  const [pastDonations, setPastDonations] = useState([]);
  const navigate = useNavigate();

  const fetchDonations = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/delivery/donations`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPastDonations(response.data);
    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data.message || "Failed to fetch past donations");
    }
  };

  const markAsDelivered = async (donationId) => {
    console.log("clicked mark as delevred");
    try {
      await axios.put(
        `${baseUrl}/api/delivery/donation/${donationId}/${"Delevered"}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const newDonations = pastDonations.map((d) => {
        if (d.id === donationId) {
          d.donationStatus = "Delevered";
        }
        return d;
      });
      setPastDonations(newDonations);
    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data.message || "Failed to mark as delivered");
    }
  };

  useEffect(() => {
    fetchDonations();
  }, [pastDonations]);

  return (
    <>
      <div className="past-history2">
        <h2>Past Food Donations</h2>
        {pastDonations.length > 0 ? (
          <ul>
            {pastDonations.map((donation) => (
              <li
                key={donation.id}
                onClick={() => {
                  navigate(`/donation/${donation?.id}`);
                }}
              >
                <div className="d1">
                  <img
                    src="https://media.istockphoto.com/id/1224414210/vector/food-donation-and-charity.jpg?s=612x612&w=0&k=20&c=Zwz7H7M1-8d23Zpgz127eAaypBznKeGm05dXe80WzHs="
                    alt=""
                  />
                  <div className="details">
                    <p style={{ fontWeight: "800" }}>Donation:</p>
                    <p>{donation.foodDescription}</p>
                    <p>{donation.foodType}</p>
                    <p>{donation.quantity}</p>
                  </div>
                </div>

                <div className="d1">
                  <Avatar
                    sx={{ width: 100, height: 100 }}
                    src={donation.recipient.profilePicture}
                  />
                  <div className="details">
                    <p style={{ fontWeight: "800" }}>Donated To:</p>
                    <p>{donation.recipient.userName}</p>
                    <p>{donation.recipient.email}</p>
                    <p>{donation.recipient.address.city}</p>
                  </div>
                </div>

                <div className="d1">
                  <Avatar
                    sx={{ width: 100, height: 100 }}
                    src={donation.donor.profilePicture}
                  />
                  <div className="details">
                    <p style={{ fontWeight: "800" }}>Donated By:</p>
                    <p>{donation.donor.userName}</p>
                    <p>{donation.donor.email}</p>
                    <p>{donation.donor.address.city}</p>
                  </div>
                </div>

                {donation.donationStatus === "Delevered" ? (
                  <Button variant="outlined" color="success">
                    Delivered
                  </Button>
                ) : (
                  <Button
                    sx={{
                      bgcolor: "#1c1c1o",
                    }}
                    variant="contained"
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      markAsDelivered(donation.id);
                    }}
                  >
                    Mark as Delivered
                  </Button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No past donations found.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Orders;
