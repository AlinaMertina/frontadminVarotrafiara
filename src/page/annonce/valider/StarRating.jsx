import React from 'react';

const StarRating = ({ nbretoil }) => {
  const createStars = () => {
    const stars = [];
    for (let i = 1; i <= nbretoil; i++) {
      stars.push(<span key={i} className="bi bi-star-fill text-warning"></span>);
    }
    return stars;
  };

  return (
    <>
    
      <div className="d-flex justify-content-center small text-warning mb-2">
        {createStars()}
      </div>
    </>
   
  );
};

export default StarRating;

