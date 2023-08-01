import React from 'react'
import background from "../assets/aboutUsBackground3.png";
import "../styles/About.css";

function About() {
  return (
    <div className="about">
      <div className="aboutTop" style={{ backgroundImage: `url(${background})` }}> 
      
      </div>
      <div className="aboutBottom"> 
        <h1>ABOUT THE WEBSITE</h1>
        <p> At Optimal Shopper, our mission is to revolutionize the way you shop for groceries. 
          We understand the importance of finding the best deals without compromising on quality, 
          and that's why we have developed a cutting-edge platform that combines the power of price and location filters. 
          With Optimal Shopper, you can effortlessly navigate through a vast array of grocery options, 
          filtering them based on your desired price range and proximity to your location. 
          Whether you're a budget-conscious shopper or simply looking to save time and effort, 
          our user-friendly interface empowers you to make informed decisions and discover the most optimal grocery options that suit your needs. 
          Say goodbye to endless searching and hello to a smarter, more efficient way of shopping. 
          Join us at Optimal Shopper and unlock a world of convenience, savings, and satisfaction.
        </p>
      </div>
    </div>
  )
}

export default About
