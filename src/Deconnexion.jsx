import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Deconnexion() {
  const navigate = useNavigate();

  useEffect(() => {
    // Effacer les données du localStorage
    localStorage.clear();

    // Rediriger vers la page d'accueil
    navigate('/');
  }, [navigate]);

  return (
    <>
    <h1>bbb</h1>
      {/* Peut-être ajouter du contenu ici si nécessaire */}
    </>
  );
}

export default Deconnexion;
