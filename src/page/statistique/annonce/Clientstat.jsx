
import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import Footer from '../../component/Footer.jsx';
import Navbar from '../../component/Navbar.jsx';
import Sidebar from '../../component/Sidebar.jsx';
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

const Clientstat = () => {
  const data =null;
  const [value,setValue]= new useState(null);
  const [datastat,setDatastat]= new useState(data);
  let [datacourbe,setCourbe]= new useState(data);
  
  const Initialisation = async ()=>{
    try {
        const response = await fetch(localStorage.getItem('mapping')+"v_inscriptions", {
          method: "GET", // Méthode HTTP (peut être GET, POST, etc.)
          headers: {
            'Content-Type': 'application/json' // Type de contenu de la requête
          }
        });
        if (!response.ok) {
          throw new Error('Problème lors de la récupération des données');
        }
        const data = await response.json();
        console.log(data)
        setDatastat(data.data);
        setValue("value");
      } catch (error) {
        console.error('Erreur:', error);
        throw error;
      }
      const timeoutId = setTimeout(() => {
        if(value==null){
          setValue("ooooo");
        }
        console.log('Après 30 secondes');
      
      }, 100); // 30000 millisecondes = 30 secondes
      return () => clearTimeout(timeoutId);
  }
    function transformDataToDatasets(data) {
      const labels = Object.keys(data); // Les labels sont les clés de l'objet JSON
      const datasets = labels.map((label) => {
          return {
              label: label.charAt(0).toUpperCase() + label.slice(1), // Mettre la première lettre en majuscule
              data: data[label],
              fill: true,
              borderColor: getRandomColor(),
              backgroundColor: "rgba(225, 225, 225, 0.5)",
              borderWidth: 1,
              pointRadius: 5,
              pointHoverRadius: 8,
          };
      });

      return datasets;
  }

  const colors = [
    'rgba(255, 99, 132, 1)',
    'rgba(200, 50, 100, 1)',
    'rgba(150, 75, 125, 1)',
    'rgba(100, 120, 80, 1)',
    'rgba(220, 20, 60, 1)',
    'rgba(255, 165, 0, 1)',
    'rgba(0, 128, 128, 1)',
    'rgba(128, 0, 128, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(255, 0, 0, 1)',
    'rgba(0, 255, 0, 1)',
    'rgba(128, 128, 0, 1)',
    'rgba(0, 0, 128, 1)',
    'rgba(255, 255, 0, 1)',
    'rgba(0, 255, 255, 1)',
    'rgba(255, 0, 255, 1)',
    'rgba(75, 0, 130, 1)',
    'rgba(173, 216, 230, 1)',
    'rgba(255, 215, 0, 1)',
    'rgba(70, 130, 180, 1)'
  ];
  
  // Fonction pour obtenir une couleur aléatoire de la liste
  function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }
  
  // Fonction pour obtenir une couleur aléatoire avec une opacité spécifiée
  function getRandomColorWithAlpha(alpha) {
      // const randomColor = getRandomColor();
      // return randomColor.replace(')', `, ${alpha})`).replace('#', 'rgba(');
      const randomIndex = Math.floor(Math.random() * colors.length);
      return colors[randomIndex];
  }

  // Exemple d'utilisation
  const jsonData = {
      poste: [14, 15, 15, 15, 15],
      validee: [7, 3, 10, 2, 8],
      vendu: [6, 3, 3, 2, 5],
  };

  const [initialisationTerminee, setInitialisationTerminee] = useState(false);
  const effectFunction = async () => {
    // Votre fonction d'initialisation
    await Initialisation();

    // Mettez à jour l'état pour indiquer que l'initialisation est terminée
    setInitialisationTerminee(true);
  };
  

  useEffect(() => {
    Initialisation();
    
    if (datastat !== null && datastat.label !== null) {
      console.log(datastat.label)
        const datacourbe = {
            labels: datastat.label,
            datasets: [
                {
                    label: "Inscription",
                    data: datastat.value, // Assurez-vous que datastat.data contient les données correctes
                    fill: true,
                    borderColor:"rgba(0, 128, 128, 1)",
                    backgroundColor: "rgba(225, 225, 225, 0.5)",
                    borderWidth: 1,
                    pointRadius: 5,
                    pointHoverRadius: 8,
                },
            ],
        };
        setCourbe(datacourbe);
    } else {
        console.error("datastat.label est null ou non défini.");
    }

    const options2 = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        elements: {
            point: {
                hitRadius: 10, // Taille de la zone de clic pour le point
            },
        },
        onClick: (event, elements) => {
            // Gestionnaire d'événements au clic sur le graphique
            if (elements.length > 0) {
                const index = elements[0].index;
                const label = datastat.label[index];
                const value = datastat.data[index];
                window.location.href = '/DetailsAnnoncesStat';
            }
        },
    };

    const ctx2 = document.getElementById('myChart2');

 
    

    if (ctx2) {
        const myChart2 = new Chart(ctx2, {
            type: 'line',
            data: datacourbe,
            options: options2,
        });

        return () => {
            myChart2.destroy();
        };
    }
   

    // Nettoyer le timeout si le composant est démonté avant que le délai ne soit écoulé
    

    
}, [value]);


  return (
    <div className="dashboard-main-wrapper">
      <Navbar />
      <Sidebar />
      <div className="dashboard-wrapper">
        <div className="container-fluid dashboard-content">
         <Navbar title="Statistique annonce"></Navbar>
          <div className="row">
            <div className="col-xl-10 col-lg-12 col-md-6 col-sm-12 col-12">
                <div className="card">
                  <canvas id="myChart2"></canvas>
                </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Clientstat;