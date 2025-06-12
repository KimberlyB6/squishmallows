import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Desserts.css';
import RecipeList from '../components/RecipeList';
import RecipeModal from '../components/RecipeModal';

const Desserts = () => {
  const [recipes, setRecipes]       = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const res = await axios.get('http://localhost:3002/api/squish');
        setRecipes(res.data);
      } catch (err) {
        console.error('Error fetching desserts:', err);
      }
    };
    loadRecipes();
  }, []);

  const openModal = recipe => setSelectedRecipe(recipe);
  const closeModal = () => setSelectedRecipe(null);

  return (
    <>
      <h2>Desserts</h2>
      <main className="container">
        <RecipeList items={recipes} onCardClick={openModal} />
      </main>

      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default Desserts;