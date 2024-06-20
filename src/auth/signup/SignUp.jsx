import React, { useState } from "react";
import "./signup.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Login from "../login/Login";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    email: "",
    phone: "",
    role: "",
    address: {
      area: "",
      city: "",
      district: "",
      state: "",
      pinCode: "",
    },
  });

  const handleChange = (e) => {
    const { id, value, dataset } = e.target;
    if (dataset.type === "address") {
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [id]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    try {
      const res = await axios.post(
        "http://localhost:8081/auth/signup",
        formData
      );
      console.log("Response:", res.data);
      localStorage.setItem("token", res.data.token);

      if (res.data.role === "DONOR") {
        navigate("/Donor");
      } else if (res.data.role === "RECIPIENT") {
        navigate("/reciver");
      } else if (res.data.role === "DELEVERY_AGENT") {
        navigate("/delivery");
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <>
      <div className="one_Signup_Signup-container">
        <div className="one_Signup_row">
          <div className="one_Signup_col  one_Signup_col2">
            <div className="one_Signup_one_myform">
              <form onSubmit={handleSubmit}>
                <div style={{ textAlign: "center" }}>
                  <h1>Register</h1>
                </div>
                <div>
                  <input
                    className="one_Signup_inputi"
                    type="text"
                    placeholder="UserName"
                    id="userName"
                    autoComplete="off"
                    value={formData.userName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    className="one_Signup_inputi"
                    type="password"
                    placeholder="Password"
                    id="password"
                    autoComplete="off"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    className="one_Signup_inputi"
                    type="email"
                    placeholder="Email"
                    id="email"
                    autoComplete="off"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    className="one_Signup_inputi"
                    type="text"
                    placeholder="Phone"
                    id="phone"
                    autoComplete="off"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <select
                    id="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option
                      className="one_Signup_disabled_options"
                      value=""
                      disabled
                    >
                      Register as
                    </option>
                    <option className="one_Signup_one_options" value="DONOR">
                      DONOR
                    </option>
                    <option
                      className="one_Signup_one_options"
                      value="RECIPIENT"
                    >
                      RECIPIENT
                    </option>
                    <option
                      className="one_Signup_one_options"
                      value="DELEVERY_AGENT"
                    >
                      DElIVERY_AGENT
                    </option>
                  </select>
                </div>
                <div>
                  <input
                    className="one_Signup_inputi"
                    type="text"
                    placeholder="Area"
                    id="area"
                    autoComplete="off"
                    data-type="address"
                    value={formData.address.area}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    className="one_Signup_inputi"
                    type="text"
                    placeholder="City"
                    id="city"
                    autoComplete="off"
                    data-type="address"
                    value={formData.address.city}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    className="one_Signup_inputi"
                    type="text"
                    placeholder="District"
                    id="district"
                    autoComplete="off"
                    data-type="address"
                    value={formData.address.district}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    className="one_Signup_inputi"
                    type="text"
                    placeholder="State"
                    id="state"
                    autoComplete="off"
                    data-type="address"
                    value={formData.address.state}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    className="one_Signup_inputi"
                    type="text"
                    placeholder="Pin Code"
                    id="pinCode"
                    autoComplete="off"
                    data-type="address"
                    value={formData.address.pinCode}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <p style={{ textAlign: "center", fontSize: "1.4rem" }}>
                    if you alredy have an account.?{" "}
                    <Link style={{ color: "orange" }} to="/login">
                      Login
                    </Link>
                  </p>
                </div>
                <div>
                  <input
                    className="one_Signup_btn"
                    type="submit"
                    value="Register"
                    id="register"
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="one_Signup_col one_Signup_image_col">
            <div className="one_Signup_vision-image-container">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlbpZFCuBRjfxNfYlWss2q-hWqQ2bKzeS0ixWzV7hP9BADdujQuwkDrm_abLYJihcJzE4&usqp=CAU"
                alt="Vision"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
