import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeList from '../components/RecipeList';
import AddRecipe from '../components/AddRecipe';

const API_BASE = "https://localhost:3002";

//http://localhost:3002
//https://squish-backend-1.onrender.com

const Desserts = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [resultMessage, setResultMessage] = useState("");



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
    setRecipes((recipes) => [...recipes, selectedRecipe]);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/api/squish/${id}`);
      setRecipes(prev => prev.filter(r => r._id !== id));
      setSelectedRecipe(null);
      setEditingRecipe(null);
      setResultMessage("Recipe deleted.");
    } catch (err) {
      console.error(err);
      setResultMessage("Failed to delete.");
    }
  };


  const openModal = recipe => setSelectedRecipe(recipe);
  const closeModal = () => {
    setSelectedRecipe(null);
    setResultMessage("");
    
  }


  return (
    <>
      <AddRecipe
        updateRecipes={updateRecipes}
        editingRecipe={editingRecipe}
        setEditingRecipe={setEditingRecipe}
        setSelectedRecipe={setSelectedRecipe}
        setResultMessage={setResultMessage}
        onEditSuccess={(updated) => {
          setRecipes(prev =>
            prev.map(r => (r._id === updated._id ? updated : r))
          );
          setEditingRecipe(null);
          setSelectedRecipe(updated);
          setResultMessage("Recipe updated.");
        }}
        resetFormTrigger={editingRecipe === null && selectedRecipe === null}
      />

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
            <div className="modal-buttons">
              <button onClick={() => {
                setEditingRecipe(selectedRecipe);
                setSelectedRecipe(null);
              }}>Edit</button>

              <button onClick={() => handleDelete(selectedRecipe._id)}>Delete</button>
            </div>
            {resultMessage && <p className="status-message">{resultMessage}</p>}

          </div>
        </div>
      )}
    </>
  );
};

export default Desserts;