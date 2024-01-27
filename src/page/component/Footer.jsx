import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
            Copyright © 2024
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="text-md-right footer-links d-none d-sm-block">
              <Link to="">About</Link>
              <Link to="">Support</Link>
              <Link to="">Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
