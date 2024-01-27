import React, { useState, useEffect } from 'react';
import { FaHeart ,FaRegHeart} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Detaille from './Detaille';
import 'bootstrap-icons/font/bootstrap-icons.css';
// Importations des fichiers CSS
import './../../../front/vendor/glightbox/css/glightbox.min.css';
import './../../../front/vendor/nouislider/nouislider.min.css';
import './../../../front/vendor/choices.js/public/assets/styles/choices.min.css';
import './../../../front/vendor/swiper/swiper-bundle.min.css';
import './../../../front/css/style.default.css';
import './../../../front/css/custom.css';

import './../../../css/styles.css';
import './../../../css/stylenotif.css';
import './../../../css/stylemessage.css';
import './../../../css/styleheader.css';
import './../../../boostrap/styles.css';
import Favorie from './class/Favorie';
import IconeEtat  from './IconeEtat';

import FavorieButton from './FavorieButton';
import StarRating from './StarRating';
function Annonce(props) {

    const v_liste_annonce=props.myclass;
    // console.log(props)
    const style = {
      top: '0.5rem',
      right: '0.5rem',
      backgroundColor: 'none',
      border: 'none'
    };
    const modifetat = async (event)=>{
        event.preventDefault();
       localStorage.setItem('mapping',localStorage.getItem('mapping')+'varotrafiaraback/');
       localStorage.setItem('idclient',1);
      //  console.log(new Favorie(null,parseFloat(localStorage.getItem('idclient')) ,v_liste_annonce.idcaracteristique));
        try {
            const response = await fetch(localStorage.getItem('mapping')+"favorie", {
              method: 'POST', 
              headers: {
                'Content-Type': 'application/json' // Type de contenu de la requête
              },
              body:JSON.stringify(new Favorie(null,parseFloat(localStorage.getItem('idclient')) ,v_liste_annonce.idcaracteristique))
            });
            if (!response.ok) {
              throw new Error('Problème lors de la récupération des données');
            }
            const data = await response.json();
          } catch (error) {
            console.error('Erreur:', error);
            throw error;
        }
    };
  return (
    <>
         <div class="col mb-5 cadre_body">
                        <div class="card h-100 ">
                          <div className="btn btn-dark position-absolute"> <IconeEtat etat= {v_liste_annonce.nometat} ></IconeEtat> </div>
                            {/* {v_liste_annonce.idfavorie !== 0 ? (
                                <button onClick={modifetat} className="btn text-white position-absolute" style={style}>
                                  <FavorieButton value={true} />
                                </button>
                            
                            ) : (
                             
                                <button onClick={modifetat} className="btn text-white position-absolute" style={style}>
                                  <FavorieButton value={false} />
                                </button>
                            )} */}


                            
                            <img class="card-img-top imagevaiture" src={localStorage.getItem('mappingimages') + v_liste_annonce.nomimage} alt="..." />
                           
                            <div class="card-body p-4">
                                <div class="text-center">
                                    
                                    <h5 class="fw-bolder">{v_liste_annonce.nommarque} {v_liste_annonce.model}</h5>
                                   
                                   <StarRating nbretoil={props.nbretoil}></StarRating>
                                    
                                    {v_liste_annonce.prixdevente}Ar
                                </div>
                            </div>
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a class="btn btn-outline-dark mt-auto" href={"/detaille/" + v_liste_annonce.idcaracteristique} >Detaille</a></div>
                            </div>
                            
                        </div>
                    </div>
    </>
  );
}

export default Annonce;