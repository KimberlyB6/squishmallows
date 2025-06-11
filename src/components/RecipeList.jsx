import React from 'react';
import RecipeCard from '../components/RecipeCard';
import '../css/RecipeList.css';

const RecipeList = ({ items, onCardClick }) => (
  <section className='home-list'>
    {items.map((item, idx) => (
      <RecipeCard key={idx} name={item.name} img={item.img} onClick={() => onCardClick(item)} />
    ))}
  </section>
);

export default RecipeList;