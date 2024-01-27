import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import Navbar from '../component/Navbar';
import Sidebar from '../component/Sidebar';
import Footer from '../component/Footer';

import './../../front/vendor/glightbox/css/glightbox.min.css';
import './../../front/vendor/nouislider/nouislider.min.css';
import './../../front/vendor/choices.js/public/assets/styles/choices.min.css';
import './../../front/vendor/swiper/swiper-bundle.min.css';
import './../../front/css/style.default.css';
import './../../front/css/custom.css';

import './../../css/styles.css';
import './../../css/stylenotif.css';
import './../../boostrap/styles.css';
import Historique from './Historique';
import { differenceInDays } from 'date-fns';
// import HeaderCRUD from '../HeaderCRUD';


function ListHistorique() {
  const { id } = useParams();
    let lista = null;
    const [listeannonce, setListeannonce] = useState(lista);
    const Initialisation = async ()=>{
        try {
          const response = await fetch(localStorage.getItem('mapping')+"v_liste_annonceshistorique",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Type de contenu de la requête
            },
            body: JSON.stringify(parseFloat(id))
          });
          if (!response.ok) {
            throw new Error('Problème lors de la récupération des données');
          }
          const data = await response.json();
          setListeannonce(data.data);
          console.log(data);
        } catch (error) {
          console.error('Erreur:', error);
          throw error;
        }
    
      }
      let bornePagination = [0, 7];
      const [bornePaginations, setBornePaginations] = useState(bornePagination);
      const paginationSuivant = (event) => {
        event.preventDefault();
        setBornePaginations([bornePaginations[0] + 7, bornePaginations[1] + 9]);
      };
    
      const paginationPrecedent = () => {
        if (bornePaginations[0] >= 4) {
          setBornePaginations([bornePaginations[0] - 7, bornePaginations[1] - 9]);
        }
      };
    useEffect(() => {
        Initialisation();
        console.log("apres initialisation")
    }, []);
  return (
    <>
    <div className="dashboard-main-wrapper">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.css" integrity="sha256-NAxhqDvtY0l4xn+YVa6WjAcmd94NNfttjNsDmNatFVc=" crossorigin="anonymous" />
      <Navbar />
      <Sidebar />
      <div className="dashboard-wrapper">
        <div className="container-fluid dashboard-content">
        
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="card">
                <h5 className="card-header">
                  Listes historique
                </h5>
                <div className="card-body">
                <div class="box shadow-sm rounded bg-white mb-3">
                    <div class="box-body p-0">
                        {
                            listeannonce !== null &&
                            listeannonce.slice(bornePaginations[0], bornePaginations[1]).map((image, index) => (
                                image !== null ? (
                                // <Presentation myclass={image} key={index}></Presentation>
                                <Historique myclass={image}></Historique>
                                // <Annonce myclass={image} key={index}></Annonce>
                                ) : null
                            ))
                        }

                    </div>
                </div>
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
    </>
    // <>
    // <Navbar />
    // <Sidebar />
    // <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.css" integrity="sha256-NAxhqDvtY0l4xn+YVa6WjAcmd94NNfttjNsDmNatFVc=" crossorigin="anonymous" />
    // <div class="container ht_content max-height-500 overflow-y-auto">
    //     <div class="row">
    //         <div class="col-lg-9 right">

    //             <div class="box shadow-sm rounded bg-white mb-3">
    //                 <div class="box-body p-0">
    //                     {
    //                         listeannonce !== null &&
    //                         listeannonce.slice(0, 14).map((image, index) => (
    //                             image !== null ? (
    //                             // <Presentation myclass={image} key={index}></Presentation>
    //                             <Historique myclass={image}></Historique>
    //                             // <Annonce myclass={image} key={index}></Annonce>
    //                             ) : null
    //                         ))
    //                     }

    //                 </div>
    //             </div>

    //         </div>
    //     </div>
    // </div>
    
    // </>
  );
}

export default ListHistorique;