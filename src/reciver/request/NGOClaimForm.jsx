import React, { useState } from "react";
import "./formCSS.css";
import axios from "axios";
import { baseUrl } from "../../utils/Api";
import Footer from "../../components/footer/Footer";

const NGOClaimForm = () => {
  const [formData, setFormData] = useState({
    NGOName: "",
    contactPerson: "",
    registrationNumber: "",
    email: "",
    phoneNumber: "",
    address: "",
    requestDescription: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    console.log(formData);

    await axios
      .put(`${baseUrl}/api/recipient/request`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log("response ==> ");
        console.log(res);
        alert("Claimed Successfully");
        setFormData({
          NGOName: "",
          contactPerson: "",
          registrationNumber: "",
          email: "",
          phoneNumber: "",
          address: "",
          requestDescription: "",
        });
      })
      .catch((err) => {
        console.log(err.message);
        alert("Claim Failed");
      });
  };

  return (
    <>
      <div className="t3clmform">
        <h2>NGO Food Claim Form</h2>
        <div>
          <label>NGO Name :</label>
          <input
            type="text"
            name="NGOName"
            value={formData.NGOName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Contact Person:</label>
          <input
            type="text"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Registration Number:</label>
          <input
            type="text"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Request Description:</label>
          <textarea
            name="requestDescription"
            value={formData.requestDescription}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <button className="submit" onClick={handleSubmit}>
            Claim
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NGOClaimForm;
