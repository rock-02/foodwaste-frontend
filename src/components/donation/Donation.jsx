import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../utils/Api";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import "./Donation.css"; // Ensure you have a CSS file for styling
import Feed from "@mui/icons-material/Feed";
import Footer from "../footer/Footer";

const Donation = () => {
  const { id } = useParams();
  const [donation, setDonation] = useState(null);
  const donationId = Number(id);
  const [user, setUser] = useState(null);
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    feedback: "",
    rating: 0,
  });

  const fetchUser = () => {
    axios
      .get(`${baseUrl}/api/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error:", error.response);
      });
  };

  const fetchDonation = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/donation/${donationId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDonation(response.data);
    } catch (error) {
      console.error("Error:", error.response);
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchDonation();
  }, [donationId]);

  const handleFeedbackChange = (event) => {
    const { name, value } = event.target;
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [name]: value,
    }));
  };

  const handleFeedbackSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${baseUrl}/api/recipient/feedback/${donationId}`,
        feedback,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Feedback submitted successfully!");
      console.log(response);
      setFeedback({
        name: "",
        email: "",
        feedback: "",
        rating: 0,
      });
    } catch (error) {
      console.error("Error:", error.response);
      alert("Error submitting feedback. Please try again.");
    }
  };

  if (!donation) {
    return <div>Loading...</div>;
  }

  const getProfileImage = (user) => {
    return user.profilePicture
      ? `${baseUrl}/uploads/${user.profilePicture}`
      : "default-profile.png";
  };

  return (
    <div className="">
      <div className="dontaionId"></div>
      <div className="donation-container">
        <h1
          style={{
            textAlign: "center",
            color: "green",
            fontSize: "2rem",
            fontWeight: "bold",
            margin: "1rem 0",
          }}
        >
          Donation Details
        </h1>
        <div className="donation-details">
          <h2>Food Description: {donation.foodDescription}</h2>
          <p>
            <strong>Food Type:</strong> {donation.foodType}
          </p>
          <p>
            <strong>Quantity:</strong> {donation.quantity}
          </p>
          <p>
            <strong>Donation Status:</strong> {donation.donationStatus}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(donation.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Delivery Started At:</strong>{" "}
            {new Date(donation.deleveryDateTimeStarted).toLocaleString()}
          </p>
          <p>
            <strong>Expected Delivery At:</strong>{" "}
            {new Date(donation.deleveryExpectedDateTime).toLocaleString()}
          </p>
        </div>
        <div className="user-details">
          <div className="user-section">
            <Avatar
              src={donation.donor.profilePicture}
              alt="Donor"
              className="profile-image"
              sx={{ height: "200px", width: "200px" }}
            >
              {donation?.donor?.userName.toUpperCase()[0]}
            </Avatar>
            <div className="details">
              <h2>Donor Details</h2>
              <p>
                <strong>User Name:</strong> {donation.donor.userName}
              </p>
              <p>
                <strong>Email:</strong> {donation.donor.email}
              </p>
              <p>
                <strong>Address:</strong>{" "}
                {`${donation.donor.address.area}, ${donation.donor.address.city}, ${donation.donor.address.district}, ${donation.donor.address.state}, ${donation.donor.address.pinCode}`}
              </p>
            </div>
          </div>
          <div className="user-section">
            <Avatar
              src={donation.recipient.profilePicture}
              alt="Recipient"
              className="profile-image"
              sx={{ height: "200px", width: "200px" }}
            />
            <div className="details">
              <h2>Recipient Details</h2>
              <p>
                <strong>User Name:</strong> {donation.recipient.userName}
              </p>
              <p>
                <strong>Email:</strong> {donation.recipient.email}
              </p>
              <p>
                <strong>Address:</strong>{" "}
                {`${donation.recipient.address.area}, ${donation.recipient.address.city}, ${donation.recipient.address.district}, ${donation.recipient.address.state}, ${donation.recipient.address.pinCode}`}
              </p>
            </div>
          </div>
          <div className="user-section">
            <Avatar
              src={donation.deleveryBoy.profilePicture}
              alt="Delivery Agent"
              className="profile-image"
              sx={{ height: "200px", width: "200px" }}
            >
              {donation?.deleveryBoy?.userName.toUpperCase()[0]}
            </Avatar>
            <div className="details">
              <h2>Delivery Agent Details</h2>
              <p>
                <strong>User Name:</strong> {donation.deleveryBoy.userName}
              </p>
              <p>
                <strong>Email:</strong> {donation.deleveryBoy.email}
              </p>
              <p>
                <strong>Address:</strong>{" "}
                {`${donation.deleveryBoy.address.area}, ${donation.deleveryBoy.address.city}, ${donation.deleveryBoy.address.district}, ${donation.deleveryBoy.address.state}, ${donation.deleveryBoy.address.pinCode}`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {donation?.recipient?.id === user?.id && (
        <div className="feedback-form">
          <h2>Submit Feedback</h2>
          <form onSubmit={handleFeedbackSubmit}>
            <TextField
              name="name"
              label="Name"
              value={feedback.name}
              onChange={handleFeedbackChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              name="email"
              label="Email"
              type="email"
              value={feedback.email}
              onChange={handleFeedbackChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              name="feedback"
              label="Feedback"
              multiline
              rows={4}
              value={feedback.feedback}
              onChange={handleFeedbackChange}
              fullWidth
              margin="normal"
              required
            />
            <Rating
              name="rating"
              value={feedback.rating}
              onChange={(event, newValue) => {
                setFeedback((prevFeedback) => ({
                  ...prevFeedback,
                  rating: newValue,
                }));
              }}
              size="large"
              sx={{ margin: "20px 0" }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<Feed />}
            >
              Submit
            </Button>
          </form>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Donation;
