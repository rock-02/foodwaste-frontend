// src/ContactUs.js
import React, { useState } from "react";
import axios from "axios";
import "./feedback.css";
import Footer from "../../components/footer/Footer";

const FeedBack = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    rating: 5, // Added rating to the initial state
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitFeedback = async () => {
    const token = localStorage.getItem("token");

    const data = {
      feedback: formData.subject,
      rating: formData.rating,
      name: formData.name,
      email: formData.email,
    };
    try {
      const response = await axios.post(
        "http://localhost:8081/api/user/feedback",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      alert("Feedback submitted successfully!");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("There was an error submitting your feedback. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitFeedback();
  };

  return (
    <>
      <div className="contact-us">
        <h1>Give FeedBack</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="subject">Feedback/Issue:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />

          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            name="rating"
            min="1"
            max="5"
            value={formData.rating}
            onChange={handleChange}
            required
          />

          <button type="submit">Submit</button>
        </form>

        <div className="contact-info">
          <p>Email: info@example.com</p>
          <p>Phone: +1234567890</p>
          <p>Address: 123 Example St, City, Country</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FeedBack;
