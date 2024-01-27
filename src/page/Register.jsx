// Autre.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import './../assets/login/css/style.css';
import Utilisateur from './../classe/Utilisateur';
import Administrateur from './../classe/Administrateur';


function Register() {
    const datavalu= null;
    const [dataselect,setData]=useState(datavalu);
    const initializeMapping = async () => {
          try {
            console.log(localStorage.getItem("mapping")+"initialisation")
            const response = await fetch(localStorage.getItem("mapping")+"initialisation", {
              method: 'GET', // Méthode HTTP (peut être GET, POST, etc.)
              headers: {
                'Content-Type': 'application/json' // Type de contenu de la requête
              },
            });
    
            if (!response.ok) {
              throw new Error('Problème lors de la récupération des données');
            }
           
            const data = await response.json();
            setData(data.data);
            console.log("genre valeur");
            console.log(data);
          } catch (error) {
            console.error('Erreur:', error);
            throw error;
          }
      };
      useEffect(() => {
        initializeMapping();
      }, []); // Assurez-vous d'ajouter les dépendances si nécessaire
      const infoadmin = new Administrateur("","","","","","","","","");
      const [infoadmins,setInfoadmins]=useState(infoadmin);
      //handler input
      const inputNom = async (event) =>{
        event.preventDefault();
        setInfoadmins((prevData) => ({
            ...prevData,
            nom: event.target.value
          }));
      }
      const inputPrenom = async (event) =>{
        event.preventDefault();
        setInfoadmins((prevData) => ({
            ...prevData,
            prenom: event.target.value
          }));
      }
      const inputEmail = async (event) =>{
        event.preventDefault();
        setInfoadmins((prevData) => ({
            ...prevData,
            email: event.target.value
          }));
      }
      const inputTel = async (event) =>{
        event.preventDefault();
        setInfoadmins((prevData) => ({
            ...prevData,
            tel: event.target.value
          }));
      }
      const inputDatenaissance = async (event) =>{
        event.preventDefault();
        setInfoadmins((prevData) => ({
            ...prevData,
            datenaissance: event.target.value
          }));
      }
      const inputMoetdepasse = async (event) =>{
        event.preventDefault();
        setInfoadmins((prevData) => ({
            ...prevData,
            motdepasse: event.target.value
          }));
      }

      const inputGenre = async (event) =>{
        event.preventDefault();
        console.log("Genre :"+event.target.value)
        setInfoadmins((prevData) => ({
            ...prevData,
            idfgenre: parseFloat(event.target.value)
          }));
      }
      const inputLocalisation = async (event) =>{
        event.preventDefault();
        setInfoadmins((prevData) => ({
            ...prevData,
            idflocalisation: parseFloat(event.target.value)
          }));
      }
      const onsub = async (event) =>{
        event.preventDefault();
        setInfoadmins((prevData) => ({
            ...prevData,
            idadministrateur: null
          }));
          console.log(infoadmins);
        try {
            console.log(localStorage.getItem("mapping")+"administrateur")
            const response = await fetch(localStorage.getItem("mapping")+"administrateur", {
              method: 'POST', // Méthode HTTP (peut être GET, POST, etc.)
              headers: {
                'Content-Type': 'application/json' // Type de contenu de la requête
              },
              body:JSON.stringify(infoadmins)
            });
    
            if (!response.ok) {
              throw new Error('Problème lors de la récupération des données');
            }
           
            const data = await response.json();
            console.log("genre valeur");
            console.log(data);
          } catch (error) {
            console.error('Erreur:', error);
            throw error;
          }
      }
      //fin handler
  return (
    <section className="ftco-section">
    <div className="container">
        <div className="row justify-content-center titreregister">
            <div className="col-md-6 text-center mb-5">
                <h2 className="heading-section">Register to Varotra fiara Admin</h2>
            </div>
        </div>
        <div className="row justify-content-center">
            <div className="col-md-12 col-lg-10">
                <div className="wrap d-md-flex">
                    <div className="text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last">
                        <div className="text w-100">
                            <h2>Welcome to Varotra Fiara Admin</h2>
                            <p>La création de compte se fait sur la version mobile de notre site. Nous vous invitons à créer un compte</p>
                            <a href="#" className="btn btn-white btn-outline-white">Download</a>
                        </div>
                    </div>
                    <div className="login-wrap p-4 p-lg-5">
                        <div className="d-flex">
                            <div className="w-100">
                                <h3 className="mb-4">Login</h3>
                            </div>
                            <div className="w-100">
                                <p className="social-media d-flex justify-content-end">
                                    <a href="#" className="social-icon d-flex align-items-center justify-content-center"><span className="fa fa-facebook"></span></a>
                                    <a href="#" className="social-icon d-flex align-items-center justify-content-center"><span className="fa fa-twitter"></span></a>
                                </p>
                            </div>
                        </div>
                        <form  className="signin-form" onSubmit={onsub}  >
                            <div className="form-group mb-3">
                                <label className="label" htmlFor="name">Nom </label>
                                <input type="text" className="form-control" placeholder="nom" required  onChange={inputNom} />
                            </div>
                            <div className="form-group mb-3">
                                <label className="label" htmlFor="password">Prenome</label>
                                <input type="text" className="form-control" placeholder="prenom" required onChange={inputPrenom} />
                            </div>
                            <div className="form-group mb-3">
                                <label className="label" htmlFor="password">Email</label>
                                <input type="email" className="form-control" placeholder="email" required  onChange={inputEmail} />
                            </div>
                            <div className="form-group mb-3">
                                <label className="label" htmlFor="password">Tel</label>
                                <input type="text" className="form-control" placeholder="tel" required  onChange={inputTel} />
                            </div>
                            <div className="form-group mb-3">
                                <label className="label" htmlFor="password">Date de naissance</label>
                                <input type="date" className="form-control" placeholder="date de naissance" required  onChange={inputDatenaissance} />
                            </div>
                            <div className="form-group mb-3">
                                <label className="label" htmlFor="password">Mot de pass</label>
                                <input type="password" className="form-control" placeholder="Password" required  onChange={inputMoetdepasse} />
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-3 col-form-label">Genre</label>
                                <div class="col-sm-9">
                                    <select class="form-control" onChange={inputGenre}>
                                        {
                                           dataselect?.genre ? (
                                            dataselect.genre.map((value, index) => (
                                                <option key={index} value={value.idgenre}>
                                                    {value.nomgenre}
                                                </option>
                                            ))
                                            ) : null
                                        }
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-3 col-form-label">Localisation</label>
                                <div class="col-sm-9">
                                    <select class="form-control" onChange={inputLocalisation } > 
                                        {
                                           dataselect?.localisation ? (
                                            dataselect.localisation.map((value, index) => (
                                                <option key={index} value={value.idlocalisation}>
                                                    {value.nomlocalisation}
                                                </option>
                                            ))
                                            ) : null
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="form-control btn btn-primary submit px-3">Login</button>
                            </div>
                            {/* <div className="form-group d-md-flex">
                                <div className="w-50 text-left">
                                    <label className="checkbox-wrap checkbox-primary mb-0">Remember Me
                                        <input type="checkbox" defaultChecked />
                                        <span className="checkmark"></span>
                                    </label>
                                </div>
                                <div className="w-50 text-md-right">
                                    <a href="#">Forgot Password</a>
                                </div>
                            </div> */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
  );
}

export default Register;
