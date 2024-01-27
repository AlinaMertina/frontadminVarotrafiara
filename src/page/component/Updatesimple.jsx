// Autre.jsx
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './../../assets/login/css/style.css';
import monImage from './imageu2.jpg';

function Updatesimple({onClose,handler,modif,nom ,titel}) {
    
    // const us= new Utilisateur("","");
    const [user,setUser]=useState(null);
    const inputEmail = (event) => {
        event.preventDefault();
        setUser((prevData) => ({
            ...prevData,
            pseudo: event.target.value,
          }));
    };   
    const inputPassword = (event) => {
        event.preventDefault();
        setUser((prevData) => ({
            ...prevData,
            password: event.target.value,
          }));
    }; 

    const onsubRecherche = async (event) =>{
        event.preventDefault();
        if(modif){
            modif(event);
        }  
    } 
    // close fonction
    const [show, setShow] = useState(true);
    const handleClose = () => {
        setShow(false);
        if (onClose) {
          onClose();
        }
      };
    
  return (
    <section className="ftco-section">
        
    <div className="container">
    
        <div className="row justify-content-center">
            <div className="col-md-6 text-center mb-5">
                <h2 className="heading-section">Update {titel}
                    <button onClick={handleClose} className="btn btn-link close-btn" style={{ fontSize: '30px' }}>
                                        <span className="fa fa-times"></span>
                    </button>
                </h2>  
            </div>
           
        </div>
        <div className="row justify-content-center">
       
            <div className="col-md-12 col-lg-10">
                <div className="wrap d-md-flex">
                  
                    <div className="text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last"> 
                        <div className="text w-100">
                            <img src={monImage} alt="Description de l'image" width="300" height="200" />
                        </div>
                    </div>
                    <div className="login-wrap p-4 p-lg-5">
                        <div className="d-flex">
                            <div className="w-100">
                                <h3 className="mb-4">Update</h3>
                            </div>
                            <div className="w-100">
                               
                            </div>
                        </div>
                        <form  className="signin-form" onSubmit={onsubRecherche} >
                         
                            <div className="form-group mb-3">
                                <label className="label" htmlFor="password">Nom value {nom}  </label>
                                <input type="text" className="form-control"     onChange={(e) => handler(e)} />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="form-control btn btn-primary submit px-3">ok</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
  );
}

export default Updatesimple;
