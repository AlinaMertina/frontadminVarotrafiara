import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './page/Signup';
import Login from './page/Login';
import Home from './page/Home';
import Marque from './page/elements/Marque';
import Client from './page/client1/Client';
import Couleur from './page/elements/Couleur';
import BoiteVitesse from './page/elements/BoiteVitesse';
import Energie from './page/elements/Energie';
import Equipement from './page/elements/Equipement';
import Etat from './page/elements/Etat';
import Genre from './page/client/Genre';
import Localisation from './page/elements/Localisation';
import Model from './page/elements/Model';
import TypeVehicule from './page/elements/TypeVehicule';
import Profil from './page/client1/Profil';
import ListHistorique from './page/client1/ListHistorique';
import Valider from './page/annonce/valider/Valider';
import DetailValider from './page/annonce/valider/DetailValider';

import Clientstat from './page/statistique/annonce/Clientstat';

import Dashboard from './page/statistique/client/Dashboard';
import AnnonceStat from './page/statistique/annonce/Annonce';
import DetailsAnnoncesStat from './page/statistique/annonce/Marquestat';
import Detaille from './page/annonce/valider/Detaille';
import Register from './page/Register';
import Commission from './page/elements/Commision';
import Commissionstat from './page/statistique/annonce/Commissionstat';
import Marquestat from './page/statistique/annonce/Marquestat';
import Favorie from './page/elements/Favorie';
import Updatesimple from './page/component/Updatesimple';
import Deconnexion from './Deconnexion';


ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/inscription" element={<Register />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/marque" element={<Marque />} />
      <Route path="/couleur" element={<Couleur />} />
      <Route path="/client" element={<Client />} />
      <Route path="/boiteVitesse" element={<BoiteVitesse />} />
      <Route path="/energie" element={<Energie />} />
      <Route path="/equipement" element={<Equipement />} />
      <Route path="/etat" element={<Etat />} />
      <Route path="/genre" element={< Genre />} />
      <Route path="/localisation" element={< Localisation />} />
      <Route path="/model" element={< Model />} />
      <Route path="/typeVehicule" element={< TypeVehicule />} />
      <Route path="/profil/:id" element={< Profil />} />
      <Route path="/valider" element={< Valider />} />
      <Route path="/DetailValider" element={< DetailValider />} />
      <Route path="/clientStat" element={< Clientstat />} />
      <Route path="/Dashboard" element={< Dashboard />} />
      <Route path="/AnnonceStat" element={< AnnonceStat />} />
      <Route path="/DetailsAnnoncesStat" element={< DetailsAnnoncesStat />} />
      <Route path="/detaille/:id" element={<Detaille />} />
      <Route path="/commission" element={<Commission />} />
      <Route path="/commissionstat" element={<Commissionstat />} />
      <Route path="/marquestat" element={<Marquestat />} />
      <Route path="/favorie" element={<Favorie />} />
      <Route path="/updatesimple" element={<Updatesimple />} />
      <Route path="/updatesimple" element={<Updatesimple />} />
      <Route path="/historique/:id" element={<ListHistorique />} />
      <Route path="/deconnexion" element={<Deconnexion />} />



    </Routes>
  </Router>,
  document.getElementById('root')
);