import React from 'react';
import Footer from './component/Footer';
import Navbar from './component/Navbar';
import Sidebar from './component/Sidebar';
import '../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../assets/vendor/fonts/circular-std/style.css';
import '../assets/libs/css/style.css';
import '../assets/vendor/fonts/fontawesome/css/fontawesome-all.css';
import '../assets/vendor/bootstrap/js/bootstrap.bundle.js';
import '../assets/vendor/datatables/css/dataTables.bootstrap4.css';
import '../assets/vendor/datatables/css/buttons.bootstrap4.css';
import '../assets/vendor/datatables/css/select.bootstrap4.css';
import '../assets/vendor/datatables/css/fixedHeader.bootstrap4.css';
import '../assets/vendor/bootstrap/js/bootstrap.bundle.js';
import { Link } from 'react-router-dom';

const Home = () => {
  // Mettez les noms de classNamees entre accolades pour JSX (className)
  return (
    <div className="dashboard-main-wrapper">
      <Navbar />
      <Sidebar />
      <div className="dashboard-wrapper">
        <div className="container-fluid dashboard-content">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="page-header">
              <h2 className="pageheader-title">FIARA OKAZ </h2>
                <p className="pageheader-text"></p>
                <div className="page-breadcrumb">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item"><Link className="breadcrumb-link">Administrateur</Link></li>
                      <li className="breadcrumb-item"><Link  className="breadcrumb-link">Annonces</Link></li>
                      <li className="breadcrumb-item active" aria-current="page">Non valider</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column">
                  <h5 className="mb-0">Listes des annonces</h5>
                  <p>Toutes les annonces sont acceptées par l'administrateur.</p>
                </div>
                <div className="ml-auto">
                  <Link className="btn btn-success">Export PDF</Link>
                </div>
              </div>

                <div className="card-body">
                  <div className="table-responsive">
                    <table id="example" className="table table-striped table-bordered second tab">
                      <thead>
                        <tr>
                            <th>Propriétaire</th>
                            <th>Models</th>
                            <th>Prix</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th></th>
                            <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                            <td>kkkkk</td>
                            <td>System Architect</td>
                            <td>Edinburgh</td>
                            <td>61</td>
                            <td>2011/04/25</td>
                            <td className="text-center"><Link className="btn btn-warning justify-content-center">Details</Link></td>
                            <td>
                                <div className="dropdown float-right">
                                    <Link href="#" className="dropdown-toggle card-drop" data-toggle="dropdown" aria-expanded="true">
                                            <i className="mdi mdi-dots-vertical"></i>
                                                  </Link>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <Link to="" className="dropdown-item">Accepter</Link>
                                        <Link to="" className="dropdown-item">Refuser</Link>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Garrett Winters</td>
                            <td>Accountant</td>
                            <td>Tokyo</td>
                            <td>63</td>
                            <td>2011/07/25</td>
                            <td className="text-center"><Link className="btn btn-warning justify-content-center">Details</Link></td>
                            <td>
                                <div className="dropdown float-right">
                                    <Link href="#" className="dropdown-toggle card-drop" data-toggle="dropdown" aria-expanded="true">
                                            <i className="mdi mdi-dots-vertical"></i>
                                                  </Link>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <Link to="" className="dropdown-item">Accepter</Link>
                                        <Link to="" className="dropdown-item">Refuser</Link>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Ashton Cox</td>
                            <td>Junior Technical Author</td>
                            <td>San Francisco</td>
                            <td>66</td>
                            <td>2009/01/12</td>
                            <td className="text-center"><Link className="btn btn-warning justify-content-center">Details</Link></td>
                            <td>
                                <div className="dropdown float-right">
                                    <Link href="#" className="dropdown-toggle card-drop" data-toggle="dropdown" aria-expanded="true">
                                            <i className="mdi mdi-dots-vertical"></i>
                                                  </Link>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <Link to="" className="dropdown-item">Accepter</Link>
                                        <Link to="" className="dropdown-item">Refuser</Link>
                                    </div>
                                </div>
                            </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
