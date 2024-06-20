import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./reciver.css"; // Import your CSS file
import Footer from "../components/footer/Footer";

export const Reciver = () => {
  const [isVisible, setIsVisible] = useState(true); // Track overall visibility

  const handleClick = () => {
    setIsVisible(false); // Hide components on any click
  };

  const [text, setText] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const fullText = ' "Reducing Food waste & nourishing communities"'; // Define the full text (correct spelling)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsAnimating(true);
    }, 1000); // Delay animation start by 1 second

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (isAnimating) {
      let currentIdx = 0;

      const interval = setInterval(() => {
        if (currentIdx < fullText.length - 1) {
          setText((prevText) => prevText + fullText[currentIdx]);
          currentIdx++;
        } else {
          clearInterval(interval);
        }
      }, 50); // Adjust speed here (lower value is faster)

      return () => clearTimeout(interval);
    }
  }, [isAnimating]);

  return (
    <>
      {isVisible && ( // Conditionally render components based on visibility
        <div className="four2">
          <div className="animated-text">{text}</div>
          <div className="upper2">
            <div className="post2">
              <div className="content2">Every bite counts, donate now</div>
              <Link to="/request" className="feedback2" onClick={handleClick}>
                Request
              </Link>
            </div>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <div className="post2">
              <div className="content2">
                Help us improve Leave your feedback now
              </div>
              <Link to="/feedback" className="feedback2" onClick={handleClick}>
                Feedback
              </Link>
            </div>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <div className="post2">
              <div className="content2">Recall Your Goodness</div>
              <Link
                to="/past-requests"
                className="feedback2"
                onClick={handleClick}
              >
                Past Orders
              </Link>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Reciver;
