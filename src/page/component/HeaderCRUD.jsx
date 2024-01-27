import React from 'react';
import { Link } from 'react-router-dom';

const HeaderCRUD = (props) => {
  return (
    <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="page-header">
                <h2 className="pageheader-title" style={{ color: 'white' }} >FIARA OKAZ </h2>
                <p className="pageheader-text"></p>
                <div className="page-breadcrumb">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link className="breadcrumb-link">{props.mtitel}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{props.title}</li>
                    </ol>
                </nav>
                </div>
            </div>
        </div>
  </div>
  );
};

export default HeaderCRUD;
