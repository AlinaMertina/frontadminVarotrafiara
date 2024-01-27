import React from 'react';
import { Link } from 'react-router-dom';
import './../../css/styles.css';

import { FaSignOutAlt } from 'react-icons/fa';
const Navbar = () => {
  return (
    <div className="dashboard-header">
      <nav className="navbar navbar-expand-lg bg-white fixed-top">
      <Link className="navbar-brand title" to="/">VAROTRA FIARA</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto navbar-right-top">
           
            <li className="nav-item dropdown nav-user">
              <a class="btn btn-outline-dark mt-auto" href={"deconnexion"} ><FaSignOutAlt size={32}  style={{ marginRight: '20px' }} /></a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
