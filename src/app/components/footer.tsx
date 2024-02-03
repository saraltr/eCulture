import React from 'react';
import { FaceFrownIcon } from '@heroicons/react/24/solid';

export default async function Footer() {
  return (
    <footer>
      <div className="contact">
        <ul>
          <li><i className="fa-solid fa-hashtag"></i> Get in contact</li>
          <li><a href="tel:+123-456-7890"><i className="fa-solid fa-phone"></i> +123-456-7890</a></li>
          <li><a href="mailto:eculture@gmail.com"><i className="fa-solid fa-envelope"></i> eculture@gmail.com</a></li>
          <li><a href="#"><i className="fa-solid fa-location-dot"></i> 123 Anywhere St., Any City</a></li>
        </ul>
      </div>
      <p>Eculture &copy; 2024 - Sara Latorre</p>
      <div className="social">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          {/* <img src="images/twitter.png" alt="twitter icon" /> */}
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          {/* <img src="images/instagram.png" alt="instagram icon" /> */}
        </a>
      </div>
    </footer>
  );
};