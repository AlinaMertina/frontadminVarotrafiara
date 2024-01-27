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

const TypeVehicule = () => {
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

     const [TypeVehicules, setTypeVehicules] = useState([]);
     const [nom, setNomTypeVehicule] = useState([]);
     const [error, setError] = useState(null);
     useEffect(() => {
          axios.get(localStorage.getItem('mapping')+'typevehicules')
            .then(response => {
              const responseData = response.data;
      
              if (responseData.error) {
                setError(responseData.error);
              } else {
               setTypeVehicules(responseData.data);
              }
            })
            .catch(error => console.error('Erreur lors de la récupération des couleurs', error));
        }, []);
     //insert 
     const handleSubmit = async (e) => {
    
          console.log('Valeur de nom:', nom);
        
          const TypeVehiculeData = {
               idtypevehicule : null,
               nomtypevehicule : nom
          };
          try {
               const response = await fetch(localStorage.getItem('mapping')+"typevehicule", {
                 method: 'POST', 
                 headers: {
                   'Content-Type': 'application/json' 
                 },
                 body: JSON.stringify(TypeVehiculeData)
               });
               
               if (!response.ok) {
                 throw new Error('Problème lors de la récupération des données');
               }
               const data = await response.json();
               console.log("rien data");
               console.log(data);
               //const responseData = await response.json();
               //setTypeVehicules(prevTypeVehicules => [...prevTypeVehicules, responseData.data]);
               console.log(data.data);
             } catch (error) {
               console.error('Erreur:', error);
               throw error;
             }
             e.preventDefault();
        };
   //delete
   const handleDelete = async (id) => {
     try {
       const response = await fetch(localStorage.getItem('mapping')+`typevehicule?id=${id}`, {
           method: 'DELETE',
           headers: {
             'Content-Type': 'application/json'
           },
       });
   
       if (!response.ok) {
         throw new Error('Problème lors de la suppression des données');
       }
       
       setNomTypeVehicule(prevNomTypeVehicule => prevNomTypeVehicule.filter(TypeVehicules => TypeVehicules.idtypevehicule !== id));
 
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
      console.log("value"+id)
      for(let i=0;i<TypeVehicules.length;i++){
          if(TypeVehicules[i].idtypevehicule==id){
            setUpdateValue(TypeVehicules[i]);
            setUpdateNom(TypeVehicules[i].nomtypevehicule);
            setIndexmodif(TypeVehicules[i].idtypevehicule)
            console.log(updateValue);
          }
      }
    }
    const setvaluehandler= (event)=>{
        event.preventDefault();
        setUpdateValue((prevData) => ({
          ...prevData,
          nomtypevehicule: event.target.value,
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
        const response = await fetch(localStorage.getItem('mapping')+"typevehicule", {
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
        setTypeVehicules((prevTypeVehicules) => {
          const updatedTypeVehicules = [...prevTypeVehicules];
          for(let i=0 ;i<updatedTypeVehicules.length;i++){
            if(updatedTypeVehicules[i].idtypevehicule==indexmodif){
              updatedTypeVehicules[i]=updateValue;
            }
          }
          return updatedTypeVehicules;
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
        <Updatesimple onClose={handleErrorClose} handler={setvaluehandler} modif={modifupdate} nom={updateNom} titel={"Type Vehicule"}></Updatesimple>
  ):(
    <div className="dashboard-main-wrapper">
      <Navbar />
      <Sidebar />
      <div className="dashboard-wrapper">
        <div className="container-fluid dashboard-content">
        <HeaderCRUD title={"Type de vehicule"} mtitle='Element'></HeaderCRUD>
          <div className="row">
               <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12">
                    <div class="card">
                         <h5 class="card-header">Listes de type vehicules</h5>
                         <div class="card-body">
                              <table class="table table-hover">
                              <thead>
                                   <tr>
                                        <th scope="col">Type</th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {TypeVehicules.slice(bornePaginations[0], bornePaginations[1]).map((type, index) => (
                                        <tr key={index}>
                                             <th scope="row">{type.nomtypevehicule}</th>
                                             <td>
                                              <button className="btn btn-info btn-rounded btn-fw" onClick={() =>setvalueupdate(type.idtypevehicule)}>
                                                        <i className="mdi mdi-autorenew"></i>
                                              </button>
                                             </td>
                                             <td>
                                             <button className="btn btn-danger btn-rounded btn-fw" onClick={() => handleDelete(type.idtypevehicule)}>
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
                              <form action="#" id="basicform" data-parsley-validate="">
                              <div class="form-group">
                                   <label for="inputUserName">Type</label>
                                   <input id="inputUserName" type="text"
                                   value={nom}
                                   onChange={(e) => setNomTypeVehicule(e.target.value)}
                                    name="name" data-parsley-trigger="change" required="" placeholder="Enter user name" autocomplete="off" class="form-control"/>
                              </div>
                              <div class="row">
                                   <div class="col-sm-2 pb-2 pb-sm-4 pb-lg-0 pr-0">
                                   </div>
                                   <div class="col-sm-10 pl-0">
                                        <p class="text-right">
                                             <button type="submit" onClick={handleSubmit} class="btn btn-space btn-primary">Enregistrer</button>
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

export default TypeVehicule;
