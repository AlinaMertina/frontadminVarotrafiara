import React, { useState, useEffect } from 'react';
import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import Sidebar from '../component/Sidebar';
import '../../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../../assets/vendor/fonts/circular-std/style.css';
import '../../assets/libs/css/style.css';
import '../../assets/vendor/fonts/fontawesome/css/fontawesome-all.css';
import '../../assets/vendor/bootstrap/js/bootstrap.bundle.js';
import '../../assets/vendor/datatables/css/dataTables.bootstrap4.css';
import '../../assets/vendor/datatables/css/buttons.bootstrap4.css';
import '../../assets/vendor/datatables/css/select.bootstrap4.css';
import '../../assets/vendor/datatables/css/fixedHeader.bootstrap4.css';
import '../../assets/vendor/bootstrap/js/bootstrap.bundle.js';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Profil = () => {  
    const { id } = useParams();
    const idClient=id;
    console.log("koko "+id);
    const [nbrpost, setNbrpost] = useState([]);
    const [valider, setValider] = useState(null);
    const [vendu, setVendu] = useState(null);
    const [annonce, setAnnonce] = useState(null);

    const [client, setClient] = useState({
        nomclient: '',
        prenomclient: '',
        datenaissance: '',
        email: '',
        nomgenre: '',
        tel: '',
        nomlocalisation: '',
        nbrposte: 24,
        valider: 7,
        nonvalider: 3,
        encours: 5,
        vendu: 2
    });
    function structureDate(date){
        const formattedDate = new Date(date);
    // Obtenir les composants de la date
    const year = formattedDate.getFullYear();
    const month = formattedDate.toLocaleString('default', { month: 'long' });
    const day = formattedDate.getDate();

    // Formater la date dans un texte lisible
    const readableDate = `${day} ${month} ${year}`;
    return readableDate;
    }
    function getNbretat(){
        if(nbrpost!=null){
            for(let i=0;i<nbrpost.length;i++){
                if(nbrpost[i].idetat==2){
                    setValider(nbrpost[i].nbr)
                }if(nbrpost[i].idetat==3){
                    setVendu(nbrpost[i].nbr)
                }
                if(nbrpost[i].idetat==1){
                    setAnnonce(nbrpost[i].nbr)
                }
            }
        }
        // console.log(valider); 
    }
    useEffect(() => {
        axios.get(localStorage.getItem('mapping')+`v_infoclient_detaille?id=${idClient}`)
          .then(response => {
            const clientData = response.data.data;
            console.log(clientData)
            setNbrpost(clientData);
            
            setClient(JSON.parse(localStorage.getItem('profileclient')));
            getNbretat();
            console.log(client)
            console.log("client vvvv")
            console.log(client)
          })
          .catch(error => console.error('Erreur lors de la récupération du client', error));
      }, [idClient]);
    console.log(client);
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
                      <li className="breadcrumb-item active" aria-current="page">Profil</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
               <div class="col-xl-3 col-lg-3 col-md-5 col-sm-12 col-12">
                            <div class="card">
                                <div class="card-body">
                                    <div class="user-avatar text-center d-block">
                                        <img src="../../assets/images/avatar-1.jpg" alt="User Avatar" class="rounded-circle user-avatar-xxl"/>
                                    </div>
                                    <div class="text-center">
                                        <h2 class="font-24 mb-0">{client.prenomclient} {client.nomclient}</h2>
                                    </div>
                                </div>
                                <div class="card-body border-top">
                                    <h3 class="font-16">Contact Information</h3>
                                    <div class="">
                                        <ul class="list-unstyled mb-0">
                                        <li class="mb-2"><i class="fas fa-fw fa-envelope mr-2"></i>{client.email}</li>
                                        <li class="mb-0"><i class="fas fa-fw fa-phone mr-2"></i>{client.tel}</li>
                                        <li class="mb-0"><i class="fas fa-fw fa-home mr-2"></i>{client.nomlocalisation}</li>
                                    </ul>
                                    </div>
                                </div>
                              
                                <div class="card-body border-top">
                                    <h3 class="font-16">Category</h3>
                                    <div>
                                        <Link href="#" class="badge badge-light mr-1">Fitness</Link><Link href="#" class="badge badge-light mr-1">Life Style</Link><Link href="#" class="badge badge-light mr-1">Gym</Link>
                                    </div>
                                </div>
                            </div>
               </div>
               <div class="col-xl-9 col-lg-9 col-md-7 col-sm-12 col-12">
               <div class="influence-profile-content pills-regular">
                                <ul class="nav nav-pills mb-3 nav-justified" id="pills-tab" role="tablist">
                                   <li class="nav-item">
                                        <a class="nav-link active" id="pills-packages-tab" data-toggle="pill" href="#pills-packages" role="tab" aria-controls="pills-packages" aria-selected="false">Information personnel</a>
                                   </li>
                                   <li class="nav-item">
                                        <a class="nav-link" id="pills-campaign-tab" data-toggle="pill" href="#pills-campaign" role="tab" aria-controls="pills-campaign" aria-selected="true">Status</a>
                                   </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="pills-msg-tab" data-toggle="pill" href="#pills-msg" role="tab" aria-controls="pills-msg" aria-selected="false">Envoyer un message</a>
                                    </li>
                                </ul>
                                <div class="tab-content" id="pills-tabContent">
                                <div class="tab-pane fade show active" id="pills-packages" role="tabpanel" aria-labelledby="pills-packages-tab">
                                        <div class="row">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="section-block">
                                                    <h2 class="section-title">Information personnel</h2>
                                                </div>
                                            </div>
                                            <div class="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">
                                                <div class="card">
                                                    <div class="card-body border-top">
                                                        <p>Nom : {client.nomclient}</p>
                                                        <p>Prénoms : {client.prenomclient}</p>
                                                        <p>Date de naissance : {structureDate(client.datenaissance)}</p>
                                                        <p>Genre : {client.nomgenre}</p>
                                                        <p>Localisation : {client.nomlocalisation}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="pills-campaign" role="tabpanel" aria-labelledby="pills-campaign-tab">
                                        <div class="row">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="section-block">
                                                    <h3 class="section-title">Annonces</h3>
                                                </div>
                                            </div>
                                            <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                                                <div class="card">
                                                    <div class="card-body">
                                                        <h1 class="mb-1">{valider}</h1>
                                                        <Link to={`/clientAnnoncesto/${idClient}/valider`}>Valider</Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                                                <div class="card">
                                                    <div class="card-body">
                                                        <h1 class="mb-1">{parseInt(annonce)-parseInt(valider)}</h1>
                                                        <p>Refuser</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                                                <div class="card">
                                                    <div class="card-body">
                                                        <h1 class="mb-1">{parseInt(valider)-parseInt(vendu)}</h1>
                                                        <p>En cours</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                                                <div class="card">
                                                    <div class="card-body">
                                                        <h1 class="mb-1">{vendu}</h1>
                                                        <p>Vendu</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="pills-msg" role="tabpanel" aria-labelledby="pills-msg-tab">
                                        <div class="card">
                                            <h5 class="card-header">Send Messages</h5>
                                            <div class="card-body">
                                                <form>
                                                    <div class="row">
                                                        <div class="offset-xl-3 col-xl-6 offset-lg-3 col-lg-3 col-md-12 col-sm-12 col-12 p-4">
                                                            <div class="form-group">
                                                                <label for="name">Votre nom</label>
                                                                <input type="text" class="form-control form-control-lg" id="name" placeholder=""/>
                                                            </div>
                                                            <div class="form-group">
                                                                <label for="email">Votre Email</label>
                                                                <input type="email" class="form-control form-control-lg" id="email" placeholder=""/>
                                                            </div>
                                                            <div class="form-group">
                                                                <label for="subject">Object</label>
                                                                <input type="text" class="form-control form-control-lg" id="subject" placeholder=""/>
                                                            </div>
                                                            <div class="form-group">
                                                                <label for="messages">Messagaes</label>
                                                                <textarea class="form-control" id="messages" rows="3"></textarea>
                                                            </div>
                                                            <button type="submit" class="btn btn-primary float-right">Envoyer</button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
               </div>
          </div>
        </div>
       
      </div>
      <Footer />
    </div>
  );
};

export default Profil;
