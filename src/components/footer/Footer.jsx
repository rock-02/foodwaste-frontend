import React from "react";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="one_Footer_footer">
      <div className="one_Footer_heading-footer">
        Food<span>Bridge</span>
      </div>
      <div className="div1">
        <h4 className="one_Footer_footer-h4">Who We Are</h4>
        <p className="one_Footer_footer-p">About Us</p>
        <p className="one_Footer_footer-p">Contact Us</p>
      </div>
      <div className="div2">
        <h4 className="one_Footer_footer-h4">Get Involved</h4>
        <p className="one_Footer_footer-p">Request For Food</p>
        <p className="one_Footer_footer-p">Donate Food</p>
      </div>
      <div className="div3">
        <h4 className="one_Footer_footer-h4 one_Footer_footer-p">Socials</h4>
        <div className="one_Footer_footer-icons">
          <p className="one_Footer_footer-p">
            <FaInstagram size={40} />
          </p>
          <p className="one_Footer_footer-p">
            <FaTwitter size={40} />
          </p>
          <p className="one_Footer_footer-p">
            <FaFacebook size={40} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
