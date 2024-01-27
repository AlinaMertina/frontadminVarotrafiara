import React from 'react';
import { Link } from 'react-router-dom';


const Sidebar = () => {
  return (
    <div className="nav-left-sidebar sidebar-dark">
      <div className="menu-list">
        <nav className="navbar navbar-expand-lg navbar-light">
          <Link className="d-xl-none d-lg-none" >Dashboard</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav flex-column">
               <li class="nav-divider">
                    Adminstrateur
               </li>
               <li className="nav-item">
                    <Link className="nav-link" data-toggle="collapse" aria-expanded="false" data-target="#submenu-1" aria-controls="submenu-1">
                         <i className="fab fa-fw fa-wpforms"></i>Eléments
                    </Link>
                    <div id="submenu-1" className="collapse submenu">
                         <ul className="nav flex-column">
                              <li className="nav-item"><Link to="/marque" className="nav-link">Marque</Link></li>
                              <li className="nav-item"><Link to="/couleur" className="nav-link">Couleur</Link></li>
                              <li className="nav-item"><Link to="/boiteVitesse" className="nav-link">Boite de vitesse</Link>
                              <li className="nav-item"><Link to="/energie" className="nav-link">Energie</Link></li>
                              <li className="nav-item"><Link to="/equipement" className="nav-link">Equipement</Link></li>
                              <li className="nav-item"><Link to="/etat" className="nav-link">Etat</Link></li>
                              <li className="nav-item"><Link to="/localisation" className="nav-link">Localisation</Link></li>
                              <li className="nav-item"><Link to="/model" className="nav-link">Model</Link></li>
                              <li className="nav-item"><Link to="/typeVehicule" className="nav-link">Type de véhicule</Link></li>
                              <li className="nav-item"><Link to="/genre" className="nav-link">Genre</Link></li>
                            

                              </li>
                         </ul>
                    </div>
               </li>
               <li class="nav-item">
                    <Link class="nav-link" to="/client">Clients</Link>
               </li>
               <li className="nav-item">
                    <Link className="nav-link" data-toggle="collapse" aria-expanded="false" data-target="#submenu-10" aria-controls="submenu-10">
                         <i className="fab fa-fw fa-wpforms"></i>Annonces
                    </Link>
                    <div id="submenu-10" className="collapse submenu">
                         <ul className="nav flex-column">
                              <li className="nav-item"><Link to="/home" className="nav-link">Non valider</Link></li>
                              <li className="nav-item"><Link to="/valider" className="nav-link">Valider</Link></li>
                         </ul>
                    </div>
               </li>
               <li class="nav-divider">
                    Paramètres et statistique
               </li>
               <li className="nav-item">
                         <Link className="nav-link" data-toggle="collapse" aria-expanded="false" data-target="#submenu-statistique" aria-controls="submenu-statistique"><i className="fab fa-fw fa-wpforms"></i>Statistique</Link>
                         <div id="submenu-statistique" className="collapse submenu">
                         <ul className="nav flex-column">
                              <li className="nav-item"><Link to="/AnnonceStat" className="nav-link">Annonce</Link></li>
                              <li className="nav-item"><Link to="/commissionstat" className="nav-link">Commission</Link></li>
                              <li className="nav-item"><Link to="/marquestat" className="nav-link">Marque</Link></li>
                              <li className="nav-item"><Link to="/clientStat" className="nav-link">Client</Link></li>
                         </ul>
                         </div>
                         </li>

                         <li className="nav-item">
                         <Link className="nav-link" data-toggle="collapse" aria-expanded="false" data-target="#submenu-configuration" aria-controls="submenu-configuration"> <i className="fab fa-fw fa-wpforms"></i>Configuration</Link>
                         <div id="submenu-configuration" className="collapse submenu">
                         <ul className="nav flex-column">
                              <li className="nav-item"><Link to="/commission" className="nav-link">Commission</Link></li>
                              <li className="nav-item"><Link to="/favorie" className="nav-link">Favorie etoil</Link></li>
                         </ul>
                         </div>
                         </li>

            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
