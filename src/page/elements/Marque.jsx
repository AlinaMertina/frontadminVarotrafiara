import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer  from '../component/Footer';
import Navbar from '../component/Navbar';
import Sidebar from '../component/Sidebar';
import '../../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../../assets/vendor/fonts/circular-std/style.css';
import '../../assets/libs/css/style.css';
import '../../assets/vendor/fonts/fontawesome/css/fontawesome-all.css';
import '../../assets/vendor/bootstrap/js/bootstrap.bundle.js';
import { Link } from 'react-router-dom';
import HeaderCRUD from '../component/HeaderCRUD';
import Updatesimple from '../component/Updatesimple.jsx';

const Marque = () => {
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


     const [marque, setMarque] = useState([]);
     const [nom, setNomMarque] = useState([]);
     const [error, setError] = useState(null);
   
     useEffect(() => {
       axios.get(localStorage.getItem('mapping')+'marques')
         .then(response => {
           const responseData = response.data;
   
           if (responseData.error) {
             setError(responseData.error);
           } else {
               setMarque(responseData.data);
           }
         })
         .catch(error => console.error('Erreur lors de la récupération des couleurs', error));
     }, []);

     const handleSubmit = async (e) => {
    
          console.log('Valeur de nom:', nom);
        
          const marqueData = {
               idmarque : null,
               nommarque : nom
          };
          try {
               const response = await fetch(localStorage.getItem('mapping')+"marque", {
                 method: 'POST', 
                 headers: {
                   'Content-Type': 'application/json' 
                 },
                 body: JSON.stringify(marqueData)
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
             e.preventDefault();
        };

        
        const handleDelete = async (id) => {
          try {
            const response = await fetch(localStorage.getItem('mapping')+`marque?id=${id}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json'
                },
            });
        
            if (!response.ok) {
              throw new Error('Problème lors de la suppression des données');
            }
            
            setNomMarque(prevNomMarque => prevNomMarque.filter(marques => marques.idmarque !== id));
      
            const data = await response.json();
            console.log("Données de suppression :", data);
          } catch (error) {
            console.error('Erreur lors de la suppression:', error);
            throw error;
          }
        };
  ///update 
  const [indexmodif, setIndexmodif] = useState(null);
  const [updateValue, setUpdateValue] = useState(null);
  const [updateNom, setUpdateNom] = useState(null);
  const setvalueupdate= (id)=>{
    for(let i=0;i<marque.length;i++){
        if(marque[i].idmarque==id){
          setUpdateValue(marque[i]);
          setUpdateNom(marque[i].nommarque);
          setIndexmodif(marque[i].idmarque)
          console.log(updateValue);
        }
    }
  }
  const setvaluehandler= (event)=>{
      event.preventDefault();
      setUpdateValue((prevData) => ({
        ...prevData,
        nommarque: event.target.value,
      }));
      setUpdateNom(event.target.value);
    
  }
  const [errordeclaration, setErrordeclaration] = useState(null);
  const handleErrorClose = () => {
    setUpdateValue(null);
    setUpdateNom(null);
  };

  const modifupdate = async (e) => {
    try {
      const response = await fetch(localStorage.getItem('mapping')+"marque", {
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
      setMarque((prevmarque) => {
        const updatedmarque = [...prevmarque];
        for(let i=0 ;i<updatedmarque.length;i++){
          if(updatedmarque[i].idmarque==indexmodif){
            updatedmarque[i]=updateValue;
          }
        }
        return updatedmarque;
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
      <Updatesimple onClose={handleErrorClose} handler={setvaluehandler} modif={modifupdate} nom={updateNom} titel={"Marque"}></Updatesimple>
  ):(
    <div className="dashboard-main-wrapper">
      <Navbar />
      <Sidebar />
      <div className="dashboard-wrapper">
        <div className="container-fluid dashboard-content">
          <HeaderCRUD title={"Marque"} mtitle='Element'></HeaderCRUD>
          <div className="row">
               <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12">
                    <div class="card">
                         <h5 class="card-header">Listes de marques</h5>
                         <div class="card-body">
                              <table class="table table-hover">
                              <thead>
                                   <tr>
                                        <th scope="col">Nom</th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                   </tr>
                              </thead>
                              <tbody>
                              {marque.slice(bornePaginations[0], bornePaginations[1]).map((marques, index) => (
                                   <tr key={index}>
                                        <th scope="row">{marques.nommarque}</th>
                                        <td>
                                            <button className="btn btn-info btn-rounded btn-fw" onClick={() =>setvalueupdate(marques.idmarque)}>
                                                      <i className="mdi mdi-autorenew"></i>
                                            </button>
                                        </td>
                                        <td>
                                        <button className="btn btn-danger btn-rounded btn-fw" onClick={() => handleDelete(marques.idmarque)}>
                                             <i className="mdi mdi-delete"></i>
                                        </button>
                                        </td>
                                   </tr>
                              ))}   
                              </tbody>;
                              </table>
                         </div>
                    </div>
               </div>
               <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                    <div class="card">
                         <h5 class="card-header">Nouveau</h5>
                         <div class="card-body">
                         <form onSubmit={handleSubmit} id="basicform" data-parsley-validate="">
                              <div class="form-group">
                                   <label for="inputUserName">Marque</label>
                                   <input id="inputUserName" 
                                   value={nom}
                                   onChange={(e) => setNomMarque(e.target.value)} 
                                   type="text" name="marque" data-parsley-trigger="change" required="" placeholder="Enter user name" autocomplete="off" class="form-control"/>
                              </div>
                              <div class="row">
                                   <div class="col-sm-2 pb-2 pb-sm-4 pb-lg-0 pr-0">
                                   </div>
                                   <div class="col-sm-10 pl-0">
                                        <p class="text-right">
                                             <button type="button" onClick={handleSubmit} class="btn btn-space btn-primary">Enregistrer</button>
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
  );
};

export default Marque;
