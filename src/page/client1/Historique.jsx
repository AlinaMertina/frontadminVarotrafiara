import React, { useState } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { differenceInDays } from 'date-fns';

import './../../front/vendor/glightbox/css/glightbox.min.css';
import './../../front/vendor/nouislider/nouislider.min.css';
import './../../front/vendor/choices.js/public/assets/styles/choices.min.css';
import './../../front/vendor/swiper/swiper-bundle.min.css';
import './../../front/css/style.default.css';
import './../../front/css/custom.css';

import './../../css/styles.css';
import './../../css/stylenotif.css';
import './../../boostrap/styles.css';
import IconeEtat from './IconeEtat';

function Historique(props) {
    const v_liste_annonce=props.myclass;
    const currentDate = new Date();
    return (
        <div class="p-3 d-flex align-items-center border-bottom osahan-post-header">
            <div class="dropdown-list-image mr-3">
                <img class="rounded-circle" src={localStorage.getItem('mappingimages') + v_liste_annonce.nomimage} alt="" />
            </div>
            <div class="font-weight-bold mr-3">
                <div class="mb-2"><span class="font-weight-normal">Voiture  {v_liste_annonce.nommarque} model {v_liste_annonce.nommodel} </span> </div>
                <a href={"/detaille/" + v_liste_annonce.idcaracteristique} ><button type="button" class="btn btn-outline-success btn-sm" >Detaille</button></a>
            </div>
            <span class="ml-auto mb-auto">
                <div class="btn-group">
                    <button type="button" class="btn btn-light btn-sm rounded" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <IconeEtat etat={v_liste_annonce.idetat}></IconeEtat>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right">
                        <button class="dropdown-item" type="button"><i class="mdi mdi-delete"></i> Delete</button>
                        <button class="dropdown-item" type="button"><i class="mdi mdi-close"></i> Turn Off</button>
                    </div>
                </div>
                <br />
                <div class="text-right text-muted pt-1">{differenceInDays(currentDate, v_liste_annonce.annemodel)}  </div>
            </span>
        </div>
    );
}

export default Historique;