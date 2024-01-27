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


const Energie = () => {

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

     const [energies, setEnergies] = useState([]);
     //const [nom, setNomEnergie] = useState('');
     const [nom, setNomEnergie] = useState([]);
     const [error, setError] = useState(null);
   
     useEffect(() => {
       axios.get(localStorage.getItem('mapping')+'energies')
         .then(response => {
           const responseData = response.data;
   
           if (responseData.error) {
             setError(responseData.error);
           } else {
               setEnergies(responseData.data);
           }
         })
         .catch(error => console.error('Erreur lors de la récupération des couleurs', error));
     }, []);

     
  const handleSubmit = async (e) => {
    
     console.log('Valeur de nom:', nom);
   
     const energieData = {
          idenergie : null,
          nomenergie : nom
     };
     try {
          const response = await fetch(localStorage.getItem('mapping')+"energie", {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json' 
            },
            body: JSON.stringify(energieData)
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
       const response = await fetch(localStorage.getItem('mapping')+`energie?id=${id}`, {
           method: 'DELETE',
           headers: {
             'Content-Type': 'application/json'
           },
       });
   
       if (!response.ok) {
         throw new Error('Problème lors de la suppression des données');
       }
       
        setNomEnergie(prevNomEnergie => prevNomEnergie.filter(energ => energ.idenergie !== id));
 
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
    for(let i=0;i<energies.length;i++){
        if(energies[i].idenergie==id){
          setUpdateValue(energies[i]);
          setUpdateNom(energies[i].nomenergie);
          setIndexmodif(energies[i].idenergie)
          console.log(updateValue);
        }
    }
  }
  const setvaluehandler= (event)=>{
      event.preventDefault();
      setUpdateValue((prevData) => ({
        ...prevData,
        nomenergie: event.target.value,
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
      const response = await fetch(localStorage.getItem('mapping')+"energie", {
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
      setEnergies((prevEnergies) => {
        const updatedEnergies = [...prevEnergies];
        for(let i=0 ;i<updatedEnergies.length;i++){
          if(updatedEnergies[i].idenergie==indexmodif){
            updatedEnergies[i]=updateValue;
          }
        }
        return updatedEnergies;
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
      <Updatesimple onClose={handleErrorClose} handler={setvaluehandler} modif={modifupdate} nom={updateNom} titel={"Boit de vitesse"}></Updatesimple>
  ):(
    <div className="dashboard-main-wrapper">
      <Navbar />
      <Sidebar />
      <div className="dashboard-wrapper">
        <div className="container-fluid dashboard-content">
          <HeaderCRUD title={"Energie"} mtitle='Element'></HeaderCRUD>
          <div className="row">
               <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12">
                    <div class="card">
                         <h5 class="card-header">Listes des energies</h5>
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
                              {energies.slice(bornePaginations[0], bornePaginations[1]).map((energ, index) => (
                                   <tr key={index}>
                                        <th scope="row">{energ.nomenergie}</th>
                                        <td>
                                          <button className="btn btn-info btn-rounded btn-fw" onClick={() =>setvalueupdate(energ.idenergie)}>
                                                    <i className="mdi mdi-autorenew"></i>
                                          </button>
                                        </td>
                                        <td>
                                        <button className="btn btn-danger btn-rounded btn-fw" onClick={() => handleDelete(energ.idenergie)}>
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
                                   <label for="inputUserName">Nom</label>
                                   
                                   <input id="inputUserName" 
                                    value={nom}
                                    onChange={(e) => setNomEnergie(e.target.value)}
                                   type="text" name="nom" data-parsley-trigger="change" required="" placeholder="" autocomplete="off" class="form-control"/>
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

export default Energie;
