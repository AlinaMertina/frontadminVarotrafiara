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
import UpdateSelect from '../component/UpdateSelect.jsx';

const Model = () => {
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

     const [model, setModel] = useState([]);
     const [marquee, setMarque] = useState([]);
     const [nom, setNomModel] = useState([]);
     const [marque, setNomMarque] = useState([]);
     const [error, setError] = useState(null);
     const [born , setBorne] = useState(null);

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
   
     useEffect(() => {
       axios.get(localStorage.getItem('mapping')+'v_model_marques')
         .then(response => {
           const responseData = response.data;
   
           if (responseData.error) {
             setError(responseData.error);
           } else {
               setModel(responseData.data);
           }
         })
         .catch(error => console.error('Erreur lors de la récupération des couleurs', error));
     }, []);
     const handleDelete = async (id) => {
          try {
            const response = await fetch(localStorage.getItem('mapping')+`model?id=${id}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json'
                },
            });
        
            if (!response.ok) {
              throw new Error('Problème lors de la suppression des données');
            }
            
            setModel(prevNomLocalisation => prevNomLocalisation.filter(localisations => localisations.idmodel !== id));
            const data = await response.json();
            console.log("Données de suppression :", data);
          } catch (error) {
            console.error('Erreur lors de la suppression:', error);
            throw error;
          }
        };

     const handleSubmit = async (e) => {
    
          console.log('Valeur de nom:', nom);
          console.log('Valeur de nom:', marque.idmarque);
        
          const modelData = {
               idmodel : null,
               nommodel : nom,
               idfmarque : marque.idmarque
          };
          try {
               const response = await fetch(localStorage.getItem('mapping')+"model", {
                 method: 'POST', 
                 headers: {
                   'Content-Type': 'application/json' 
                 },
                 body: JSON.stringify(modelData)
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
       ///update 
    const [indexmodif, setIndexmodif] = useState(null);
    const [updateValue, setUpdateValue] = useState(null);
    const [updateNomA, setUpdateNomA] = useState(null);
    const [updateNomB, setUpdateNomB] = useState(null);

    
    const setvalueupdate= (id)=>{
      for(let i=0;i<model.length;i++){
          if(model[i].idmodel==id){
            setUpdateValue(model[i]);
            setUpdateNomA(model[i].nommarque);
            setUpdateNomB(model[i].nommodel);
            setIndexmodif(model[i].idmodel)
          }
      }
    }
    function getnommarque(idmarque){
          for(let i=0;i<marquee.length;i++){
               if(marquee[i].idmarque==idmarque){
                    return marquee[i].nommarque;
               }
          }
          return "";
    }
    const setvaluehandlerA= (event)=>{
        event.preventDefault();
        console.log("modif marque")
        setUpdateValue((prevData) => ({
          ...prevData,
          idfmarque: event.target.value,
          nommarque:getnommarque(event.target.value),
        }));
        console.log("valuee "+getnommarque(event.target.value))
        setUpdateNomA(getnommarque(event.target.value));
      
    }
    const setvaluehandlerB= (event)=>{
      event.preventDefault();
      setUpdateValue((prevData) => ({
        ...prevData,
        nommodel: event.target.value,
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
        const response = await fetch(localStorage.getItem('mapping')+"model", {
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
        setModel((prevlocalisation) => {
          const updatedlocalisation = [...prevlocalisation];
          for(let i=0 ;i<updatedlocalisation.length;i++){
            if(updatedlocalisation[i].idmodel==indexmodif){
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
          <UpdateSelect onClose={handleUpdateClose} marquee={marquee} handlerA={setvaluehandlerA} handlerB={setvaluehandlerB} modif={modifupdate} nomA={updateNomA} nomB={updateNomB} titel={"Model"} ></UpdateSelect>
      ):(
    <div className="dashboard-main-wrapper">
      <Navbar />
      <Sidebar />
      <div className="dashboard-wrapper">
        <div className="container-fluid dashboard-content">
          <HeaderCRUD title={"Model"} mtitle='Element'></HeaderCRUD>
          <div className="row">
               <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12">
                    <div class="card">
                         <h5 class="card-header">Listes de modèles</h5>
                         <div class="card-body">
                              <table class="table table-hover">
                              <thead>
                                   <tr>
                                        <th scope="col">Nom</th>
                                        <th scope="col">Marque</th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                   </tr>
                              </thead>
                              <tbody>
                              {model.slice(bornePaginations[0], bornePaginations[1]).map((models, index) => (
                                   <tr key={index}>
                                        <th scope="row">{models.nommodel}</th>
                                        <th scope="row">{models.nommarque}</th>
                                        <td> 
                                             <button className="btn btn-info btn-rounded btn-fw" onClick={() =>setvalueupdate(models.idmodel)}>
                                                      <i className="mdi mdi-autorenew"></i>
                                             </button>
                                            </td>
                                        <td>
                                        <button className="btn btn-danger btn-rounded btn-fw" onClick={() =>handleDelete(models.idmodel)}>
                                                      <i className="mdi mdi-autorenew"></i>
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
                              <form onSubmit={handleSubmit} id="basicform" data-parsley-validate="">
                              <div class="form-group">
                                   <label for="inputUserName">Models</label>
                                   <input id="inputUserName" 
                                   value={nom}
                                   onChange={(e) => setNomModel(e.target.value)} 
                                   type="text" name="nom" data-parsley-trigger="change" required="" placeholder="Enter user name" autocomplete="off" class="form-control"/>
                              </div>
                              <div class="form-group">
                                   <label for="input-select">Marque</label>
                                   

                                   <select class="form-control" id="input-select" name="marque">
                                   {marquee.slice(bornePaginations[0], bornePaginations[1]).map((marquees, index) => (
                                        <option key={index} value={marquees.idmarque} onChange={(e) => setNomMarque(e.target.value)}> {marquees.nommarque}</option>
                                   ))}  
                                   </select>

                                   
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

export default Model;
