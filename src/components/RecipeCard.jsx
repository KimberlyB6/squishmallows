import React from 'react';
import '../css/RecipeCard.css';

const RecipeCard = ({ name, img, onClick }) => (
  <div className='card' onClick={onClick}>
    <div className='card-img'>
      <img src={img} alt={name} />
    </div>
    <div className='card-footer'>{name}</div>
  </div>
);

export default RecipeCard;