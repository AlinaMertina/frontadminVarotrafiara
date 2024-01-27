import React, { useState,useEffect,useRef } from 'react';
import { useParams } from 'react-router-dom';

import Footer from '../../component/Footer.jsx';
import Navbar from '../../component/Navbar.jsx';
import Sidebar from '../../component/Sidebar.jsx';
import '../../../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../../../assets/vendor/fonts/circular-std/style.css';
import '../../../assets/libs/css/style.css';
import '../../../assets/vendor/fonts/fontawesome/css/fontawesome-all.css';
import '../../../assets/vendor/bootstrap/js/bootstrap.bundle.js';
import '../../../assets/vendor/datatables/css/dataTables.bootstrap4.css';
import '../../../assets/vendor/datatables/css/buttons.bootstrap4.css';
import '../../../assets/vendor/datatables/css/select.bootstrap4.css';
import '../../../assets/vendor/datatables/css/fixedHeader.bootstrap4.css';
import '../../../assets/vendor/bootstrap/js/bootstrap.bundle.js';
import './../../../front/vendor/glightbox/css/glightbox.min.css';
import './../../../front/vendor/nouislider/nouislider.min.css';
import './../../../front/vendor/choices.js/public/assets/styles/choices.min.css';
import './../../../front/vendor/swiper/swiper-bundle.min.css';
import './../../../front/css/style.default.css';
import './../../../front/css/custom.css';
import { Link } from 'react-router-dom';
import Validation from './../../../classe/Validation.js';

const Detaille = () => {
  const { id } = useParams();
  const lienimage ="";
  const [lienImage, setlienImage] = useState(lienimage);
  const detaille = null;
  const [datadetaille, setDatadetaille] = useState(detaille);
  const [detaillevalidation, setDetaillevalidation] = useState(null);
  const [images,setImage]=useState([]);
  const Initialisation = async ()=>{
      try {
        const response = await fetch(localStorage.getItem("mapping")+"v_liste_annoncesfactorid", {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify(id)
        });
        if (!response.ok) {
          throw new Error('Problème lors de la récupération des données');
        }
        const data = await response.json();
        if (data && data.data) {
          console.log("valideee ");
          console.log(data);
          
          setDatadetaille(data.data[0]);
          setImage(data.data[0].listePhotocaracteristiques);
          console.log(images);
        } else {
          console.error("La réponse ne contient pas les données attendues :", data);
        }
      } catch (error) {
        console.error('Erreur:', error);
        throw error;
      }

      try {
        const response = await fetch(localStorage.getItem("mapping")+"v_admin_valideannonceC", {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify(id)
        });
        if (!response.ok) {
          throw new Error('Problème lors de la récupération des données');
        }
        const data = await response.json();
        if (data && data.data) {
          console.log("info validation");
          console.log(data.data);
          setDetaillevalidation(data.data)
        } else {
          console.error("La réponse ne contient pas les données attendues :", data);
        }
      } catch (error) {
        console.error('Erreur:', error);
        throw error;
      }


  
    }
  const validation = useRef(null);
  const infoclient = useRef(null);
  const validation_commision =(event)=>{
    event.preventDefault();
    const div1 = validation.current;
    const div2 = infoclient.current;
    if (div1 && div2) {
      div1.style.display = 'block';
      div2.style.display="none";
    }
  }
  const info_client=(event)=>{
    event.preventDefault();
    const div1 = validation.current;
    const div2 = infoclient.current;
    if (div1 && div2) {
      div1.style.display = 'none';
      div2.style.display='block';
    }
  }
  useEffect(() => {
      Initialisation();
  }, []); 
  //ajout commission
  const validationvalue = new Validation("","","","","");
  const [validationvalues, setValidationvalues] = useState(validationvalue);
  const ajoutCommission = async (event)=>{
    event.preventDefault();
  const admin = JSON.parse(localStorage.getItem("infoadmin"));
    setValidationvalues((prevData) => ({
      ...prevData,
      datevalidation: formatDate(new Date()),
      idcaracteristique: datadetaille.v_liste_annonce.idcaracteristique,
      idadministrateur: admin.idadministrateur,
      idvalidation: null,
      commissionvalidation: parseFloat(event.target.value)
    }));
  }
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

  function formatDate(inputDate) {
    const dateObject = new Date(inputDate);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const onsub = async (event) => {
    event.preventDefault();
    try {
        const response = await fetch(localStorage.getItem("mapping")+"validation", {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(validationvalues)
      });
      if (!response.ok) {
        throw new Error('Problème lors de la récupération des données');
      }
      const data = await response.json();
     
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
    console.log(validationvalues);
  };
  //fin commission

  const onsubnew = async (event) => {
    try {
      event.preventDefault();
  
      const admin = JSON.parse(localStorage.getItem("infoadmin"));
      const validationstruct = {
        idetat: 2,
        idcaracteristique: datadetaille.v_liste_annonce.idcaracteristique,
        idadmin: admin.idadministrateur,
      };
      console.log(validationstruct)
      const response = await fetch(localStorage.getItem("mapping") + "valideannonce", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validationstruct),
      });
  
      if (!response.ok) {
        throw new Error(`Problème lors de la requête : ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Données récupérées avec succès :', data);
  
    } catch (error) {
      console.error('Erreur lors de la requête:', error.message);
      // Vous pouvez également afficher un message à l'utilisateur ici si nécessaire
    }
  };
  

  //validation annonce 
    
  //fin validation annonce
 
  return (
    <>
    <div className="dashboard-main-wrapper">
      <Navbar />
      <Sidebar />
      <div className="dashboard-wrapper">
      <div className="container-fluid dashboard-content">
      <div className="row">
    <section class="py-5">
    <div class="container">
      <div class="row mb-5">
        <div class="col-lg-6">
        
          <div class="row m-sm-0">
            <div class="col-sm-2 p-sm-0 order-2 order-sm-1 mt-2 mt-sm-0 px-xl-2">
              <div class="swiper product-slider-thumbs">
                <div class="swiper-wrapper vertical-content">
                {
                  images ? (
                    images.slice(1, 6).map((value, index) => (
                      <div className="swiper-slide h-50 vmargin" key={index}>
                        <a
                          className="glightbox product-view"
                          href={localStorage.getItem("mappingimages") + value.nomimage}
                          data-gallery="gallery2"
                          data-glightbox={"Product item "+index}
                        >
                          {console.log(index)}
                          <img
                            className="img-fluid"
                            src={localStorage.getItem("mappingimages") + value.nomimage}
                            alt="..."
                          />
                        </a>
                      </div>
                    ))
                  ) : null
                }
                </div>
              </div>
            </div>
            <div class="col-sm-10 order-1 order-sm-2">
              <div class="swiper product-slider">
                <div class="swiper-wrapper">
                {
                  images ? (
                    images.slice(1, 6).map((value, index) => (
                      <div className="swiper-slide vertical-content" key={index}>
                        <a
                          className="glightbox product-view"
                          href={localStorage.getItem("mappingimages") + value.nomimage}
                          data-gallery="gallery2"
                          data-glightbox={"Product item "+index}
                        >
                          {console.log(index)}
                          <img
                            className="img-fluid"
                            src={localStorage.getItem("mappingimages") + value.nomimage}
                            alt="..."
                          />
                        </a>
                      </div>
                    ))
                  ) : null
                }

                  
                  
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-lg-6">
          <h1>Info Vehicule</h1>
          <p class="text-sm mb-4 info_vehicule">
            {console.log( datadetaille?.v_liste_annonce)}
          {
      datadetaille?.v_liste_annonce ? (
    <div>
      <h4>🌟 Performance Écologique</h4>
      Parcourez des distances incroyables grâce à une autonomie remarquable de{" "}
      <strong>{datadetaille.v_liste_annonce.autonomie}</strong> km. Profitez
      d'une efficacité énergétique exceptionnelle pour des trajets sans
      compromis avec un kilometrage de{" "}
      <strong>{datadetaille.v_liste_annonce.kilometrage}</strong> km.
      <h4>🔋 Motorisation Avancée</h4>
      Propulsé par une énergie{" "}
      <strong>{datadetaille.v_liste_annonce.nomenergie}</strong> respectueuse
      de l'environnement. Une puissance impressionnante pour une conduite
      dynamique de capacité{" "}
      <strong>{datadetaille.v_liste_annonce.capacite}</strong> kWh.
      <h4>🌈 Personnalisation Inégalée</h4>
      Couleur: <strong>{datadetaille.v_liste_annonce.nomcouleur}</strong>{" "}
      Choisissez parmi une palette de couleurs éclatantes pour refléter votre
      style. Options de Portes/Places: Conçu pour répondre à vos besoins avec
      un nombre généreux de <strong>{datadetaille.v_liste_annonce.nbrporte}</strong>{" "}
      portes et de <strong>{datadetaille.v_liste_annonce.nbrplace}</strong>{" "}
      places.
      <h4>💰 Prix Compétitif</h4>
      Un excellent rapport qualité-prix pour une voiture de cette envergure, prix
      de <strong>{datadetaille.v_liste_annonce.prixdevente}</strong> Ar.
      Commission de <strong>{datadetaille.v_liste_annonce.commission}</strong> %
      du prix par l'entreprise.
      <h4>📏 Dimensions Précises</h4>
      Longueur: <strong>{datadetaille.v_liste_annonce.longueur}</strong> m,
      Largeur: <strong>{datadetaille.v_liste_annonce.largeur}</strong> m,
      Hauteur: <strong>{datadetaille.v_liste_annonce.hauteur}</strong>m Des
      proportions idéales pour une conduite confortable et une présence sur la
      route.
      <h4>🛄 Espace de Chargement Spacieux</h4>
      Volume du Coffre:{" "}
      <strong>{datadetaille.v_liste_annonce.volumeducoffre}</strong> mètre carré.
      Ample espace pour vos bagages, courses et plus encore.
      <h4>📍 Localisation Idéale</h4>
      Disponible à{" "}
      <strong>{datadetaille.v_liste_annonce.nomlocalisation}</strong> pour une
      expérience d'achat pratique.
    </div>
  ) : null
}


                       
           </p>
         
        </div>
      </div>
      
      <ul class="nav nav-tabs border-0" id="myTab" role="tablist">
        <li class="nav-item"><a class="nav-link text-uppercase active" id="description-tab" data-bs-toggle="tab" href="#description" role="tab" aria-controls="description" aria-selected="true" onClick={validation_commision}>Validation</a></li>
        <li class="nav-item"><a class="nav-link text-uppercase" id="reviews-tab" data-bs-toggle="tab" href="#reviews" role="tab" aria-controls="reviews" aria-selected="false" onClick={info_client} >Info client</a></li>
      </ul>
      <div class="tab-content mb-5" id="myTabContent" >
        {
           detaillevalidation?(
            <div class="col-12 grid-margin stretch-card ajout_commision" ref={validation}>
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Information deja valider le {structureDate(detaillevalidation.datevalidation)}</h4>
                  <p class="card-description">
                   par l'administrateur {detaillevalidation.nom} {detaillevalidation.prenom}
                  </p>
                </div>
              </div>
            </div>
           ):(
            <div class="col-12 grid-margin stretch-card ajout_commision" ref={validation}>
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Validation</h4>
                  <p class="card-description">
                    {/* Si vous validez cette annonce votre non admin ser */}
                  </p>
                  <form class="form-inline" onSubmit={onsubnew}>
            
                    <button type="submit" class="btn btn-primary mb-2">Valider</button>
                  </form>
                </div>
              </div>
            </div>
           )
        }
        
       
        {
          datadetaille?.v_liste_annonce ? (
          <div class="col-12 grid-margin stretch-card infoclient"  ref={infoclient}>
            <div class="card">
                <div class="card-body">
                    <div class="row">
                      <div class="col-lg-8">
                        <div class="d-flex mb-3">
                          <div class="flex-shrink-0"><img class="rounded-circle" src="img/customer-1.png" alt="" width="50"/></div>
                          <div class="ms-3 flex-shrink-1">
                            <h6 class="mb-0 text-uppercase">{datadetaille.v_liste_annonce.nomclient} {datadetaille.v_liste_annonce.prenomclient}</h6>
                            <p class="small text-muted mb-0 text-uppercase">Email :{datadetaille.v_liste_annonce.email}</p>
                            <p class="small text-muted mb-0 text-uppercase">Tel :{datadetaille.v_liste_annonce.tel}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
              
           
          </div>
          ):null
        }
       
      </div>

    </div>
  </section>
  </div>
  </div>
  <Footer />
</div>
</div>
  </>
  );
};

export default Detaille;
