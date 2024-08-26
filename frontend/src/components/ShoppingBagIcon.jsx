// frontend/src/components/ShoppingBagIcon.js
import React from 'react';
import { FaShoppingBag } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ShoppingBagIcon = () => {
  const navigate = useNavigate();
  
  const handleIconClick = () => {
    navigate('/checkout');
  };

  return (
    <FaShoppingBag
      className="text-2xl cursor-pointer absolute top-12 right-36 text-white " 
      onClick={handleIconClick}
    />
  );
};

export default ShoppingBagIcon;
