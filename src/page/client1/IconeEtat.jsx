import React from 'react';
import { FaCheckCircle, FaPaperPlane, FaShoppingCart } from 'react-icons/fa';

const IconeEtat = (props) => {
  console.log(props.etat)
  return (
    
     <div>
      {props.etat === 1 && <FaCheckCircle color="green" size={15} />}
      {props.etat === 2 && <FaPaperPlane color="blue" size={15} />}
      {props.etat === 3 && <FaShoppingCart color="red" size={15} />}
    </div>
  );
};

export default IconeEtat;
