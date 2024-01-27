import React from 'react';
import { FaCheckCircle, FaPaperPlane, FaShoppingCart } from 'react-icons/fa';

const IconeEtat = (props) => {
  console.log(props.etat)
  return (
    
     <div>
      {props.etat === "validee" && <FaCheckCircle color="green" size={15} />}
      {props.etat === "annonce" && <FaPaperPlane color="blue" size={15} />}
      {props.etat === "vendu" && <FaShoppingCart color="red" size={15} />}
    </div>
  );
};

export default IconeEtat;
