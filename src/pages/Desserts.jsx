import React, { useState } from 'react';
import '../css/Desserts.css';
import RecipeList from '../components/RecipeList';
import RecipeModal from '../components/RecipeModal';
import recipesData from '../data/recipe.json';


const Desserts = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
    const openModal = recipe => setSelectedRecipe(recipe);
    const closeModal = () => setSelectedRecipe(null);

  return (
    <>
      <main className="container">
        <RecipeList items={recipesData} onCardClick={openModal} />
      </main>

      {selectedRecipe && (
        <RecipeModal recipe={selectedRecipe} onClose={closeModal} />
      )}
    </>
  );
};

export default Desserts;
