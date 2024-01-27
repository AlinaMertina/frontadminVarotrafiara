import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import Footer from '../../component/Footer';
import Navbar from '../../component/Navbar';
import Sidebar from '../../component/Sidebar';
import '../../../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../../../assets/vendor/fonts/circular-std/style.css';
import '../../../assets/libs/css/style.css';
import '../../../assets/vendor/fonts/fontawesome/css/fontawesome-all.css';
import '../../../assets/vendor/bootstrap/js/bootstrap.bundle.js';
import '../../../assets/vendor/datatables/css/dataTables.bootstrap4.css';
import '../../../assets/vendor/datatables/css/buttons.bootstrap4.css';
import '../../../assets/vendor/datatables/css/select.bootstrap4.css';
import '../../../assets/vendor/datatables/css/fixedHeader.bootstrap4.css';
import '../../../assets/vendor/charts/morris-bundle/morris.css';
import '../../../assets/vendor/bootstrap/js/bootstrap.bundle.js';
import { Link } from 'react-router-dom';

const Details = () => {
  
  

  useEffect(() => {
     
     // Données du troisième graphique (Doughnut Chart)
    const data3 = {
     labels: ["Audit", "Marcedes", "TSY HAIKO", "PaGEAUT"],
     datasets: [{
         label: "Exemple de statistique",
         data: [15, 25, 20, 10],
         backgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)', 'rgba(75, 192, 192, 0.8)', 'rgba(255, 255, 0, 0.8)'],
         borderWidth: 1
     }]
 };
 // Configuration du troisième graphique (Doughnut Chart)
 const options3 = {
     cutout: '0%', // Pour un graphique en forme de beignet (Doughnut)
   };
   const ctx3 = document.getElementById('myChart');
     // Créer le troisième graphique avec Chart.js (Doughnut Chart)
     const myChart3 = new Chart(ctx3, {
          type: 'doughnut',
          data: data3,
          options: options3
     });
    return () => {
      // Aucune action spécifique nécessaire ici pour react-chartjs-2
      myChart3.destroy();
    };
  }, []);

  return (
    <div className="dashboard-main-wrapper">
      <Navbar />
      <Sidebar />
      <div className="dashboard-wrapper">
        <div className="container-fluid dashboard-content">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="page-header">
                <h2 className="pageheader-title">FIARA OKAZ </h2>
                <p className="pageheader-text"></p>
                <div className="page-breadcrumb">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item"><Link className="breadcrumb-link">Administrateur</Link></li>
                      <li className="breadcrumb-item"><Link className="breadcrumb-link">Annonces</Link></li>
                      <li className="breadcrumb-item active" aria-current="page">Non valider</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="card">
               <canvas id="myChart"></canvas>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Details;
