import React, { useState, useEffect } from 'react';
import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import Sidebar from '../component/Sidebar';
import '../../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../../assets/vendor/fonts/circular-std/style.css';
import '../../assets/libs/css/style.css';
import '../../assets/vendor/fonts/fontawesome/css/fontawesome-all.css';
import '../../assets/vendor/bootstrap/js/bootstrap.bundle.js';
import { Link } from 'react-router-dom';
import axios from 'axios';
import HeaderCRUD from '../component/HeaderCRUD';
import Updatesimple from '../component/Updatesimple.jsx';

const Couleur = () => {
  
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


  const [colors, setColors] = useState([]);
  const [nom, setNom] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(localStorage.getItem('mapping')+'couleurs')
      .then(response => {
        const responseData = response.data;

        if (responseData.error) {
          setError(responseData.error);
        } else {
          setColors(responseData.data);
        }
      })
      .catch(error => console.error('Erreur lors de la récupération des couleurs', error));
  }, []);

  const handleSubmit = async (e) => {
    
     console.log('Valeur de nom:', nom);
   
     const couleurData = {
          idcouleur : null,
           nomcouleur : nom
     };
     try {
          const response = await fetch(localStorage.getItem('mapping')+"couleur", {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json' 
            },
            body: JSON.stringify(couleurData)
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
      const response = await fetch(localStorage.getItem('mapping')+`couleur?id=${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
      });
  
      if (!response.ok) {
        throw new Error('Problème lors de la suppression des données');
      }
  
       // Mettez à jour l'état local en excluant l'élément supprimé
      setColors(prevColors => prevColors.filter(color => color.idcouleur !== id));

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
  const [updateNom, setUpdateNom] = useState(null);
  const setvalueupdate= (id)=>{
    for(let i=0;i<colors.length;i++){
        if(colors[i].idcouleur==id){
          setUpdateValue(colors[i]);
          setUpdateNom(colors[i].nomcouleur);
          setIndexmodif(colors[i].idcouleur)
          console.log(updateValue);
        }
    }
  }
  const setvaluehandler= (event)=>{
      event.preventDefault();
      setUpdateValue((prevData) => ({
        ...prevData,
        nomcouleur: event.target.value,
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
      const response = await fetch(localStorage.getItem('mapping')+"couleur", {
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
      setColors((prevColors) => {
        const updatedcolors = [...prevColors];
        for(let i=0 ;i<updatedcolors.length;i++){
          if(updatedcolors[i].idcouleur==indexmodif){
            updatedcolors[i]=updateValue;
          }
        }
        return updatedcolors;
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
            <HeaderCRUD title={"Couleur"} mtitle='Element'></HeaderCRUD>
          <div className="row">
            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12">
              <div className="card">
                <h5 className="card-header">Listes de marques</h5>
                <div className="card-body">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Nom</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {colors.slice(bornePaginations[0], bornePaginations[1]).map((color, index) => (
                        <tr key={index}>
                          <td>{color.nomcouleur}</td>
                          <td>
                            <button className="btn btn-info btn-rounded btn-fw" onClick={() =>setvalueupdate(color.idcouleur)}>
                                      <i className="mdi mdi-autorenew"></i>
                            </button>
                          </td>
                          <td>
                              <button className="btn btn-danger btn-rounded btn-fw" onClick={() => handleDelete(color.idcouleur)}>
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
              <div className="card">
                <h5 className="card-header">Nouveau</h5>
                <div className="card-body">
                  <form onSubmit={handleSubmit} id="basicform" data-parsley-validate="">
                    <div className="form-group">
                      <label htmlFor="inputUserName">Nom</label>
                      <input
                         id="inputUserName"
                         type="text"
                         name="nom"
                         value={nom}
                         onChange={(e) => setNom(e.target.value)}
                         data-parsley-trigger="change"
                         required=""
                         placeholder=""
                         autoComplete="off"
                         className="form-control"
                      />
                    </div>
                    <div className="row">
                      <div className="col-sm-2 pb-2 pb-sm-4 pb-lg-0 pr-0"></div>
                      <div className="col-sm-10 pl-0">
                        <p className="text-right">
                          <button type="button" onClick={handleSubmit} className="btn btn-space btn-primary">Enregistrer</button>
                          <button type="reset" className="btn btn-space btn-light">Annuler</button>
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

export default Couleur;
