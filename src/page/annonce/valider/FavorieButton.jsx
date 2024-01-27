import React, { useState } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

function FavorieButton(props) {
  const [isFavorie, setIsFavorie] = useState(props.value);

  const handleClick = () => {
    setIsFavorie(!isFavorie);
  };

  return (
    <div onClick={handleClick}>
      {isFavorie ? <FaHeart color="red" size={30} /> : <FaRegHeart color="red" size={30} />}
    </div>
  );
}

export default FavorieButton;
