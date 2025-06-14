import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeList from '../components/RecipeList';
import AddRecipe from '../components/AddRecipe';

const API_BASE = "https://squish-backend-1.onrender.com"


const Desserts = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/squish`);
        setRecipes(res.data);
      } catch (err) {
        console.error('Error fetching desserts:', err);
      }
    };
    loadRecipes();
  }, []);


  const updateRecipes = (selectedRecipe) => {
        setRecipes((recipes)=>[...recipes, selectedRecipe]);
    };

  const openModal = recipe => setSelectedRecipe(recipe);
  const closeModal = () => setSelectedRecipe(null);

  return (
    <>
      <AddRecipe updateRecipes={updateRecipes} />
      <h2>Desserts</h2>
      <main className="container">
        <RecipeList items={recipes} onCardClick={openModal} />
      </main>

      {selectedRecipe && (
        <div
          id="recipe-modal"
          className="modal-backdrop"
          onClick={closeModal}
        >
          <div
            className="modal-content"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={closeModal}
            >
              &times;
            </button>
            <h2>{selectedRecipe.name}</h2>
            <img
              src={`${API_BASE}/${selectedRecipe.img_name}`}
              alt={selectedRecipe.name}
              style={{
                width: '100%',
                maxHeight: '300px',
                objectFit: 'cover',
                marginBottom: '16px'
              }}
            />
            <p>{selectedRecipe.description}</p>

            <h3>Ingredients</h3>
            <ul>
              {selectedRecipe.ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>

            <h3>Instructions</h3>
            <ol>
              {selectedRecipe.instructions.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </>
  );
};

export default Desserts;