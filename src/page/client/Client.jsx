import React from 'react';
import Footer  from '../component/Footer';
import Navbar from '../component/Navbar';
import Sidebar from '../component/Sidebar';
import '../../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../../assets/vendor/fonts/circular-std/style.css';
import '../../assets/libs/css/style.css';
import '../../assets/vendor/fonts/fontawesome/css/fontawesome-all.css';
import '../../assets/vendor/bootstrap/js/bootstrap.bundle.js';
import { Link } from 'react-router-dom';

const Client = () => {
  // Mettez les noms de classes entre accolades pour JSX (className)
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
                      <li className="breadcrumb-item"><Link  className="breadcrumb-link">Client</Link></li>
                      <li className="breadcrumb-item active" aria-current="page">Listes</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
               <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div class="card">
                         <h5 class="card-header">
                              Listes des clients
                            </h5>
                         <div class="card-body">
                              <table class="table table-hover">
                              <thead>
                                   <tr>
                                        <th scope="col">Nom</th>
                                        <th scope="col">Prenoms</th>
                                        <th scope="col">Téléphone</th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                   </tr>
                              </thead>
                              <tbody>
                                   <tr>
                                        <th scope="row">1</th>
                                        <td>fvfbvbbbbbbbbbbbbbbbbbbbbbbbbbbbb</td>
                                        <td>Otto</td>
                                        <td className="text-center"><Link className="btn btn-info justify-content-center" to="/profil">Profil</Link></td>
                                        <td><Link class="btn btn-danger btn-rounded btn-fw"><i class="mdi mdi-delete"></i></Link></td>
                                   </tr>
                                   <tr>
                                        <th scope="row">1</th>
                                        <td>fbbbb</td>
                                        <td>Otto</td>
                                        <td className="text-center"><Link className="btn btn-info justify-content-center">Profil</Link></td>
                                        <td><Link class="btn btn-danger btn-rounded btn-fw"><i class="mdi mdi-delete"></i></Link></td>
                                   </tr>
                                   <tr>
                                        <th scope="row">1</th>
                                        <td>lokkkjo,non,onon</td>
                                        <td>Otto</td>
                                        <td className="text-center"><Link className="btn btn-info justify-content-center">Profil</Link></td>
                                        <td><Link class="btn btn-danger btn-rounded btn-fw"><i class="mdi mdi-delete"></i></Link></td>
                                   </tr>
                              </tbody>
                              </table>
                         </div>
                    </div>
               </div>
          </div>
        </div>
        <Footer/>
      </div>
    </div>
  );
};

export default Client;
