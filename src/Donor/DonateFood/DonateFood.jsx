import axios from "axios";
import React, { useState } from "react";
import { baseUrl } from "../../utils/Api";
import { useNavigate } from "react-router-dom";

import "./donateFood.css";
import Footer from "../../components/footer/Footer";

const DonateFood = () => {
  // State variables to hold form data
  const [foodDescription, setFoodDescription] = useState("");
  const [foodType, setFoodType] = useState(""); // Text input for foodType
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform submission logic here (e.g., sending data to backend)
    const postData = {
      foodDescription,
      foodType,
      quantity,
    };

    console.log("Form submitted:", postData);

    try {
      const response = await axios.post(
        `${baseUrl}/api/donor/create`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Response:", response.data);
      alert("Donated Successfully"); // Alert with the message from response
      // Navigate to the donor page after successful submission
      navigate("/Donor");
    } catch (error) {
      console.error("Error:", error.response); // Log the error for debugging
      alert(error.response.data.message); // Alert for any error
    }

    // Reset form fields after submission
    setFoodDescription("");
    setFoodType("");
    setQuantity(0);
  };

  return (
    <>
      <div className="one_Login_one_myform">
        <form onSubmit={handleSubmit}>
          <div style={{ textAlign: "center" }}>
            <h1>Donor Form</h1>
          </div>
          <div>
            <textarea
              rows="4"
              cols="60"
              placeholder="Food Description"
              className="one_placeholder"
              value={foodDescription}
              onChange={(e) => setFoodDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div>
            <input
              className="one_Login_inputi"
              type="text"
              placeholder="Food Type"
              id="foodType"
              autoComplete="off"
              value={foodType}
              onChange={(e) => setFoodType(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              className="one_Login_inputi"
              type="number"
              placeholder="Quantity"
              id="quantity"
              autoComplete="off"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              className="one_Login_btn"
              type="submit"
              value="Donate"
              id="donate"
            />
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default DonateFood;
