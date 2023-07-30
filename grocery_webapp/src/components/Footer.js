import React from "react";
import { Link } from "react-router-dom";
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import "../styles/Footer.css";

function Footer() {
    return (
      <div className="footer">
        <div className="socialMedia">
          <a href="https://www.instagram.com/">
            <InstagramIcon />
          </a>
          <a href="https://www.twitter.com">
            <TwitterIcon />
          </a>
          <a href="https://www.facebook.com">
            <FacebookIcon />
          </a>
          <a href="https://www.linkedin.com">
            <LinkedInIcon />
          </a>
        </div>
        <p> OptimalShopper</p>
      </div>
    );
  }

export default Footer;