import { useEffect, useState } from "react";
import { baseUrl } from "../../utils/Api";
import axios from "axios";
import "./past-history.css";
import { Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";

const PastHistory = () => {
  const [pastDonations, setPastDonations] = useState([]); // Placeholder for past donation data
  const navigate = useNavigate();

  const fetchDonations = async () => {
    await axios
      .get(`${baseUrl}/api/donor/donations`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setPastDonations(response.data);
      })
      .catch((error) => {
        console.error("Error:", error.response);
        alert(error.response.data.message);
      });
  };

  useEffect(() => {
    fetchDonations();
  }, []);

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
                  <div>
                    <p style={{ fontWeight: "800" }}>Donation : </p>
                    <p>{donation.foodDescription}</p>
                    <p>{donation.foodType}</p>
                    <p>{donation.quantity}</p>
                  </div>
                </div>

                <div className="d1">
                  <Avatar
                    sx={{
                      height: "100px",
                      marginLeft: "3px",
                      width: "100px",
                    }}
                    src={donation.recipient.profilePicture}
                  ></Avatar>

                  <div>
                    <p style={{ fontWeight: "800" }}>Donated To :</p>
                    <p>{donation.recipient.userName}</p>
                    <p>{donation.recipient.email}</p>
                    <p>{donation.recipient.address.city}</p>
                  </div>
                </div>

                <div className="d1">
                  <Avatar
                    sx={{
                      height: "100px",
                      marginLeft: "3px",
                      width: "100px",
                    }}
                    src={donation.deleveryBoy.profilePicture}
                  ></Avatar>

                  <div>
                    <p style={{ fontWeight: "800" }}>Delivered By:</p>
                    <p>{donation.deleveryBoy.userName}</p>
                    <p>{donation.deleveryBoy.email}</p>
                    <p>{donation.deleveryBoy.address.city}</p>
                  </div>
                </div>

                <div
                  className="d1"
                  style={{
                    marginLeft: "15px",
                  }}
                >
                  <Button variant="contained" color="primary">
                    {donation.donationStatus}
                  </Button>
                </div>
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

export default PastHistory;
