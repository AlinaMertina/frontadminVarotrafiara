import React, { useState, useEffect } from 'react';
import Footer  from '../component/Footer';
import Navbar from '../component/Navbar';

import Sidebar from '../component/Sidebar';
import '../../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../../assets/vendor/fonts/circular-std/style.css';
import '../../assets/libs/css/style.css';
import '../../assets/vendor/fonts/fontawesome/css/fontawesome-all.css';
import '../../assets/vendor/bootstrap/js/bootstrap.bundle.js';
import '../../assets/vendor/fonts/flag-icon-css/flag-icon.min.css';
import '../../assets/vendor/fonts/material-design-iconic-font/css/materialdesignicons.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import HeaderCRUD from '../component/HeaderCRUD';
import ErrorPopup from '../component/ErrorPopup';
import Update2input from '../component/Update2input.jsx';

const Favorie = () => {
   
    const [errordeclaration, setErrordeclaration] = useState(null);
    const handleErrorClose = () => {
        setErrordeclaration(null);
    };

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

     const [boitdevitesses, setBoitdevitesse] = useState([]);
     const [nomboitdereception, setNomboitdereception] = useState('');
     const [bornea, setBornea] = useState('');
     const [borneb,setBorneb] = useState('');
     const [pourcentage, setPourcentage] = useState('');
     const [error, setError] = useState(null);

     useEffect(() => {
          axios.get(localStorage.getItem('mapping')+'configufavories')
            .then(response => {
              const responseData = response.data;
      
              if (responseData.error) {
                setError(responseData.error);
              } else {
                setBoitdevitesse(responseData.data);
              }
            })
            .catch(error => console.error('Erreur lors de la récupération des  configufavorie', error));
        }, []);
        
        const handleSubmit = async (e) => {
            e.preventDefault();
          console.log('Valeur de nom:', nomboitdereception);
          const boitdevitesseData = {
                idconfiguration :null,
                bornea :bornea,
                borneb :borneb,
                nombre :pourcentage
          };
        
          if(parseInt(pourcentage)>=100){
            setErrordeclaration("le pourcentage ne devrais pas depacer 100 ")
            return ;
          }
          
          console.log(boitdevitesseData);
          try {
            console.log(localStorage.getItem('mapping')+"configufavorie")
               const response = await fetch(localStorage.getItem('mapping')+"configufavorie", {
                 method: 'POST', 
                 headers: {
                   'Content-Type': 'application/json' 
                 },
                 body: JSON.stringify(boitdevitesseData)
               });
               
               if (!response.ok) {
                 throw new Error('Problème lors de la récupération des données');
               }
               const data = await response.json();
               console.log("rien data");
               console.log(data);
               console.log(data.data);
             } catch (error) {
               console.error('Erreur:', error);
               throw error;
             }
            //  e.preventDefault();
        };
        const handleDelete = async (id) => {
          try {
            const response = await fetch(localStorage.getItem('mapping')+`configufavorie?id=${id}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json'
                },
            });
        
            if (!response.ok) {
              throw new Error('Problème lors de la suppression des données');
            }
        
             // Mettez à jour l'état local en excluant l'élément supprimé
             setBoitdevitesse(prevBoitdevitesses => prevBoitdevitesses.filter(boite => boite.idconfiguration !== id));
      
            const data = await response.json();
            console.log("Données de suppression :", data);
        
            // Mettez à jour l'état ou effectuez d'autres actions après la suppression
          } catch (error) {
            console.error('Erreur lors de la suppression:', error);
            throw error;
          }
        };
          ///update 
    const [indexmodif, setIndexmodif] = useState(null);
    const [updateValue, setUpdateValue] = useState(null);
    const [updateNomA, setUpdateNomA] = useState(null);
    const [updateNomB, setUpdateNomB] = useState(null);
    const [pourcentageU, setPourcentageU] = useState(null);
    const setvalueupdate= (id)=>{
     
      for(let i=0;i<boitdevitesses.length;i++){
        console.log("value"+id)
          if(boitdevitesses[i].idconfiguration==id){
            setUpdateValue(boitdevitesses[i]);
            setUpdateNomA(boitdevitesses[i].bornea);
            setUpdateNomB(boitdevitesses[i].borneb);
            setPourcentageU(boitdevitesses[i].nombre)
            setIndexmodif(boitdevitesses[i].idconfiguration)
            console.log(updateValue);
          }
      }
    }
    const setvaluepourcentageU= (event)=>{
      event.preventDefault();
      setUpdateValue((prevData) => ({
        ...prevData,
        nombre: event.target.value,
      }));
      setPourcentageU(event.target.value);
    
  }
    const setvaluehandlerA= (event)=>{
        event.preventDefault();
        setUpdateValue((prevData) => ({
          ...prevData,
          bornea: event.target.value,
        }));
        setUpdateNomA(event.target.value);
      
    }
    const setvaluehandlerB= (event)=>{
      event.preventDefault();
      setUpdateValue((prevData) => ({
        ...prevData,
        borneb: event.target.value,
      }));
      setUpdateNomB(event.target.value);
    
  }
    const [closeupdate, setCloseupdate] = useState(null);
    const handleUpdateClose = () => {
      setUpdateValue(null);
      setUpdateNomA(null);
      setUpdateNomB(null);
    };

    const modifupdate = async (e) => {
      try {
        const response = await fetch(localStorage.getItem('mapping')+"configufavorie", {
          method: 'PUT', 
          headers: {
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify(updateValue)
        });
        
        if (!response.ok) {
          throw new Error('Problème lors de la récupération des données');
        }
        const data = await response.json();
        console.log("rien data");
        setBoitdevitesse((prevlocalisation) => {
          const updatedlocalisation = [...prevlocalisation];
          for(let i=0 ;i<updatedlocalisation.length;i++){
            if(updatedlocalisation[i].idconfiguratio==indexmodif){
              updatedlocalisation[i]=updateValue;
            }
          }
          return updatedlocalisation;
        });
        console.log('BOIT DE VITESSE')
        console.log(updateValue)
        console.log(data);
        console.log(data.data);
      } catch (error) {
        console.error('Erreur:', error);
        throw error;
      }
    
      
    
      // e.preventDefault();
    };
    ///fin value 
  return (
    updateValue?(
      <Update2input onClose={handleUpdateClose} handlerA={setvaluehandlerA} handlerB={setvaluehandlerB} modif={modifupdate} nomA={updateNomA} nomB={updateNomB} titel={"Commission"} nomP={pourcentageU} handlerP={setvaluepourcentageU}></Update2input>
    ):(
    errordeclaration ? (
        <ErrorPopup errorMessage={"le pourcentage ne devrais pas depacer 100"} onClose={handleErrorClose} />
      ) : (
        <div className="dashboard-main-wrapper">
        <Navbar />
        <Sidebar />
        <div className="dashboard-wrapper">
          <div className="container-fluid dashboard-content">
           <HeaderCRUD title={"Etoil Favorie"} mtitle='Configuration'></HeaderCRUD>
            <div className="row">
                 <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12">
                      <div class="card">
                           <h5 class="card-header">Configuration de nombre etoil</h5>
                           <div class="card-body">
                                <table class="table table-hover">
                                <thead>
                                     <tr>
                                          <th scope="col">Min</th>
                                          <th scope="col">Max</th>
                                          <th scope="col">Nombre etoil</th>
                                          <th scope="col"></th>
                                          <th scope="col"></th>
                                     </tr>
                                </thead>
                                <tbody>
                                {boitdevitesses.slice(bornePaginations[0], bornePaginations[1]).map((boite, index) => (
                                     <tr key={index}>
                                          <td>{boite.bornea}</td>
                                          <td>{boite.borneb}</td>
                                          <td>{boite.nombre}</td>
                                          <td>
                                            <button className="btn btn-info btn-rounded btn-fw" onClick={() =>setvalueupdate(boite.idconfiguration)}>
                                                      <i className="mdi mdi-autorenew"></i>
                                            </button>
                                          </td>
                                          <td>
                                               <button className="btn btn-danger btn-rounded btn-fw" onClick={() => handleDelete(boite.idconfiguration)}>
                                               <i className="mdi mdi-delete"></i>
                                               </button>
                                          </td>
                                     </tr>
                                     
                                     ))}
                                </tbody>
                                </table>
                           </div>
                      </div>
                 </div>
                 <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                      <div class="card">
                           <h5 class="card-header">Nouveau</h5>
                           <div class="card-body">
                                <form onSubmit={handleSubmit}id="basicform" data-parsley-validate="">
                                  <div class="form-group">
                                      <label for="inputUserName">Borne A </label>
                                      <input id="inputUserName" type="text" name="nom" 
                                      // value={nomboitdereception}
                                      onChange={(e) => setBornea(e.target.value)}
                                      data-parsley-trigger="change" required="" placeholder="min" autocomplete="off" class="form-control"/>
                                  </div>
                                  <div class="form-group">
                                      <label for="inputUserName">Borne B </label>
                                      <input id="inputUserName" type="text" name="nom" 
                                      // value={nomboitdereception}
                                      onChange={(e) => setBorneb(e.target.value)}
                                      data-parsley-trigger="change" required="" placeholder="max" autocomplete="off" class="form-control"/>
                                  </div>
                                  <div class="form-group">
                                      <label for="inputUserName">Nombre etoil </label>
                                      <input id="inputUserName" type="text" name="nom" 
                                      // value={nomboitdereception}
                                      onChange={(e) => setPourcentage(e.target.value)}
                                      data-parsley-trigger="change" required="" placeholder="pourcentage" autocomplete="off" class="form-control"/>
                                  </div>
                                <div class="row">
                                     <div class="col-sm-2 pb-2 pb-sm-4 pb-lg-0 pr-0">
                                     </div>
                                     <div class="col-sm-10 pl-0">
                                          <p class="text-right">
                                               <button type="submit" class="btn btn-space btn-primary">Enregistrer</button>
                                               <button class="btn btn-space btn-light">Annuler</button>
                                          </p>
                                     </div>
                                </div>
                                </form>
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
      </div>
      )     
  )
   
  );
};

export default Favorie;
