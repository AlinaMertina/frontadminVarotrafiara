
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

const Dashboard = () => {
  useEffect(() => {
    // Données du premier graphique (Bar Chart)
    const data1 = {
        labels: ["Janvier", "Février", "Mars", "Avril", "Mai"],
        datasets: [
            {
              label: "Exemple de statistique",
              data: [10, 20, 15, 25, 30],
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            },
            {
                label: "Valider",
                data: [15, 10, 18, 12, 30],
                fill: false,
                borderColor: 'red',
                borderWidth: 1
            }
        ]
    };

    // Configuration du premier graphique (Bar Chart)
    const options1 = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    // Récupérer le contexte du canvas pour le premier graphique (Bar Chart)
    const ctx1 = document.getElementById('myChart1');

    // Créer le premier graphique avec Chart.js (Bar Chart)
    const myChart1 = new Chart(ctx1, {
        type: 'bar',
        data: data1,
        options: options1
    });

    

    // Données du deuxième graphique (Line Chart)
    const data2 = {
      labels: ["Janvier", "Février", "Mars", "Avril", "Mai"],
      datasets: [
          {
              label: "Poste",
              data: [5, 15, 10, 20, 25],
              fill: true,
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderWidth: 1,
              pointRadius: 5, // Taille du point
              pointHoverRadius: 8 // Taille du point au survol
          },
          {
              label: "Valider",
              data: [15, 10, 18, 12, 30],
              fill: true,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderWidth: 1
          },
          {
            label: "Valider",
            data: [8, 13, 11, 4, 25],
            fill: true,
            borderColor: 'yellow',
            backgroundColor: 'rgba(255, 255, 0, 0.2)',
            borderWidth: 1
          }
      ]
  };

    // Configuration du deuxième graphique (Line Chart)
    const options2 = {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        elements: {
          point: {
            hitRadius: 10 // Taille de la zone de clic pour le point
          }
        },
        onClick: (event, elements) => {
          // Gestionnaire d'événements au clic sur le graphique
          if (elements.length > 0) {
            // Un point a été cliqué
            const index = elements[0].index;
            const label = data2.labels[index];
            const value = data2.datasets[0].data[index];
            //alert(Clic sur le point "${label}" avec la valeur ${value});
            // Ajoutez votre logique d'action ici
            window.location.href = '/DetailStat';
          }
        }
    };

    // Récupérer le contexte du canvas pour le deuxième graphique (Line Chart)
    const ctx2 = document.getElementById('myChart2');

    // Créer le deuxième graphique avec Chart.js (Line Chart)
    const myChart2 = new Chart(ctx2, {
        type: 'line',
        data: data2,
        options: options2
    });

    // Données du troisième graphique (Doughnut Chart)
    const data3 = {
      labels: ["Rouge", "Bleu", "Vert", "Jaune"],
      datasets: [{
          label: "Exemple de statistique",
          data: [15, 25, 20, 10],
          backgroundColor: ['rgba(255, 99, 132, 0.😎', 'rgba(54, 162, 235, 0.😎', 'rgba(75, 192, 192, 0.😎', 'rgba(255, 255, 0, 0.😎'],
          borderWidth: 1
      }]
  };
  // Configuration du troisième graphique (Doughnut Chart)
  const options3 = {
    cutout: '0%', // Pour un graphique en forme de beignet (Doughnut)
  };

   // Récupérer le contexte du canvas pour le troisième graphique (Doughnut Chart)
   const ctx3 = document.getElementById('myChart3');

   // Créer le troisième graphique avec Chart.js (Doughnut Chart)
   const myChart3 = new Chart(ctx3, {
       type: 'doughnut',
       data: data3,
       options: options3
   });
    // Nettoyer le premier graphique lors de la destruction du composant
    return () => {
      myChart1.destroy();
      myChart2.destroy();
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
                      <li className="breadcrumb-item"><Link  className="breadcrumb-link">Annonces</Link></li>
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
                <canvas id="myChart1"></canvas>
                </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="card">
                  <canvas id="myChart2"></canvas>
                </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">
              <div className="card">
                <canvas id="myChart3"></canvas>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;