import React from "react";

import "./home.css";
import { Card, CardHeader } from "@mui/material";
import Footer from "../../components/footer/Footer";
const Home = () => {
  return (
    <div id="home">
      <div id="home-1">
        <div>
          <h1>Food Bridge</h1>
          <p>
            Food Bridge is a platform that connects food donors with food <br />
            receivers. We aim to reduce food wastage and hunger by providing a{" "}
            <br />
            platform for donors to donate excess food to receivers in need.
          </p>
        </div>
      </div>
      <div id="home-2">
        <h1>Our Vision</h1>
        <div>
          <p>
            At Foodbridge, we envision a world where no one goes hungry, where
            every individual has access to nutritious food, and where
            communities thrive through collective efforts to combat hunger and
            food insecurity. FoodBridge is a platform that connects restaurants,
            businesses, individuals, and guest houses with NGOs and charitable
            organizations to facilitate food donations and support those in
            need. We believe that by leveraging technology and fostering
            partnerships, we can make a meaningful impact in the fight against
            hunger. We are committed to empowering restaurants and businesses to
            donate surplus food, reducing food waste, and redistributing
            resources to where they are most needed. By providing a seamless and
            efficient platform for food donations, we aim to streamline the
            process and maximize the impact of each contribution. z Furthermore,
            we seek to raise awareness about the issue of hunger and inspire
            others to join us in our mission. Through education, advocacy, and
            community engagement, we aim to build a network of compassionate
            individuals and organizations dedicated to eradicating hunger and
            building a more equitable society. Together, we can make a
            difference and create a future where hunger is no longer a barrier
            to a healthy and thriving life.
          </p>

          <img
            src="https://t3.ftcdn.net/jpg/02/92/07/56/360_F_292075696_hGdSBQ9Bvf1jsaVMP2rTpuRr0VMATck0.jpg"
            alt=""
          />
        </div>

        <div id="home-3">
          <h1>TestiMonals</h1>
          <div id="home-32">
            <p>
              As an NGO representative working with FoodBridge, I've witnessed
              firsthand the incredible impact this platform has on our
              community. FoodBridge seamlessly connects us with generous food
              donors, ensuring that surplus meals reach those in need
              efficiently. Platform's intuitive interface and dedicated support
              team make the donation process effortless. With FoodBridge, we can
              focus on our mission to alleviate hunger.
            </p>
            <p>
              Collaborating with FoodBridge has revolutionized operations for
              our restaurant. It not only curbs food wastage by facilitating
              surplus food donations but also amplifies our community
              involvement. FoodBridge offers a user-friendly platform to
              schedule pickups, monitor donations, and avail tax benefits
              seamlessly. We find solace in knowing that our extra food finds
              its way to those in need.
            </p>

            <p>
              Being a delivery agent for FoodBridge has been a rewarding
              experience. I take pride in delivering meals from donors to NGOs,
              knowing that I'm part of a system that fights food insecurity.
              FoodBridge's advanced routing technology ensures that deliveries
              are optimized for efficiency, allowing me to cover more ground and
              deliver more meals in less time. It's fulfilling to be a part of
              FoodBridge
            </p>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
