import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    const data = {
      email: formData.email,
      password: formData.password,
    };
    try {
      const res = await axios.post("http://localhost:8081/auth/login", data);
      localStorage.setItem("token", res.data.token);

      console.log(res.data.token);

      if (res.data.role === "DONOR") {
        navigate("/Donor");
      } else if (res.data.role === "RECIPIENT") {
        navigate("/reciver");
      } else if (res.data.role === "DELEVERY_AGENT") {
        navigate("/delivery");
      }
    } catch (err) {
      console.log("Error:", err);
      if (err.response && err.response.data && err.response.data.message) {
        window.alert(err.response.data.message);
      } else {
        window.alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="one_Login_Login-container">
        <div className="one_Login_row">
          <div className="one_Login_col  one_Login_col2">
            <div className="one_Login_one_myform">
              <form onSubmit={handleLogin}>
                <div style={{ textAlign: "center" }}>
                  <h1>Login</h1>
                </div>
                <div>
                  <input
                    className="one_Login_inputi"
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
                    className="one_Login_inputi"
                    type="password"
                    placeholder="Password"
                    id="password"
                    autoComplete="off"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <select
                    id="userType"
                    value={formData.userType}
                    onChange={handleChange}
                  >
                    <option
                      className="one_Login_disabled_options"
                      value=""
                      disabled
                    >
                      Select User type
                    </option>
                    <option className="one_Login_one_options" value="sender">
                      Donor
                    </option>
                    <option className="one_Login_one_options" value="receiver">
                      Recipient
                    </option>
                    <option
                      className="one_Login_one_options"
                      value="delivery_executive"
                    >
                      Delivery Executive
                    </option>
                  </select>
                </div>
                <div>
                  <p style={{ textAlign: "center" }}>
                    dont have an account.? <Link to="/signup">Register</Link>
                  </p>
                </div>
                <div>
                  <input
                    className="one_Login_btn"
                    type="submit"
                    value="Login"
                    id="login"
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="one_Login_col one_Login_image_col">
            <div className="one_Login_vision-image-container">
              <img
                src="https://img.freepik.com/premium-vector/volunteers-box-concept_118813-4962.jpg?w=740"
                alt="Vision"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
