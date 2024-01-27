import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Huhu = () => {
  const [colors, setColors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Appel de l'API Spring Boot pour récupérer la liste de couleurs
    axios.get('http://localhost:8080/varotrafiaraback/couleurs')
      .then(response => {
        const responseData = response.data;

        if (responseData.error) {
          // Si la réponse contient une erreur, la traiter en conséquence
          setError(responseData.error);
        } else {
          // Sinon, mettre à jour l'état avec les données de couleur
          setColors(responseData.data);
        }
      })
      .catch(error => console.error('Erreur lors de la récupération des couleurs', error));
  }, []);

        if (error) {
          // Gérer l'affichage d'une erreur si nécessaire
          return (
            <div>
              <h1>Erreur</h1>
              <p>{error}</p>
            </div>
          );
        }
        return (
          <div>
            <h1>Liste de couleurs</h1>
            <ul>
              {colors.map( (color, index) => 
                <li key={index}> {color.nomcouleur} </li>
              )}
            </ul>
          </div>
        );
      };

export default Huhu;
