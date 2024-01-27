import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import Sidebar from '../component/Sidebar';
import '../../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../../assets/vendor/fonts/circular-std/style.css';
import '../../assets/libs/css/style.css';
import '../../assets/vendor/fonts/fontawesome/css/fontawesome-all.css';
import '../../assets/vendor/bootstrap/js/bootstrap.bundle.js';
import HeaderCRUD from '../component/HeaderCRUD.jsx';
import { FaUser,FaHistory} from 'react-icons/fa';


const Client = () => {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);
  let bornePagination = [0, 5];
  
  const [bornePaginations, setBornePaginations] = useState(bornePagination);
  const paginationSuivant = (event) => {
    event.preventDefault();
    setBornePaginations([bornePaginations[0] + 4, bornePaginations[1] + 5]);
  };

  const paginationPrecedent = () => {
    if (bornePaginations[0] >= 4) {
      setBornePaginations([bornePaginations[0] - 4, bornePaginations[1] - 5]);
    }
  };

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate('/profil', { state: { idclient: id } });
  };

  useEffect(() => {
    axios.get(localStorage.getItem('mapping')+'v_info_clients')
      .then(response => {
        const responseData = response.data;

        if (responseData.error) {
          setError(responseData.error);
        } else {
          setClients(responseData.data);
          
        }
      })
      .catch(error => console.error('Erreur lors de la récupération des clients', error));
  }, []);

  return (
    <div className="dashboard-main-wrapper">
      <Navbar />
      <Sidebar />
      <div className="dashboard-wrapper">
        <div className="container-fluid dashboard-content">
         <HeaderCRUD title='Info Client' mtitel='Client'></HeaderCRUD>
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="card">
                <h5 className="card-header">
                  Listes des clients
                </h5>
                <div className="card-body">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Nom</th>
                        <th scope="col">Prenoms</th>
                        <th scope="col">Localisation</th>
                        <th scope="col"></th>
                        <th scope="col"></th>

                      </tr>
                    </thead>
                    <tbody>
                      {clients.slice(bornePaginations[0], bornePaginations[1]).map((clt, index) => (
                        <tr key={index}>
                          <td>{clt.nomclient}</td>
                          <td>{clt.prenomclient}</td>
                          <td>{clt.nomlocalisation}</td>
                          <td className="text-center">
                            <Link
                              className="btn btn-info justify-content-center"
                              to={`/profil/${clt.idclient}`}
                            
                              >
                                {localStorage.setItem("profileclient",JSON.stringify(clt))}
                                <FaUser size={20} color="black" />
                            </Link>
                          </td>
                          <td className="text-center">
                            <Link
                              className="btn btn-info justify-content-center"
                              to={`/historique/${clt.idclient}`}
                            
                              >
                                {localStorage.setItem("profileclient",JSON.stringify(clt))}
                                <FaHistory size={20} color="black" />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
       
      </div>
      <div class="list_paginationback">
                        <div class="btn-group" role="group" aria-label="Basic example">
                          <button type="button" class="btn btn-outline-secondary" onClick={paginationPrecedent}>1</button>
                          <button type="button" class="btn btn-outline-secondary">X</button>
                          <button type="button" class="btn btn-outline-secondary" onClick={paginationSuivant}>3</button>
                        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Client;
