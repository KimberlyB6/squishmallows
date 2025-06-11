import React from 'react';
import '../css/RecipeModal.css';

const RecipeModal = ({ recipe, onClose }) => {
  const { name, image, description, ingredients, instructions } = recipe;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2 className="modal-title">{name}</h2>
        <img src={image} alt={name} className="modal-image" />
        <p className="modal-description">{description}</p>
        <h3>Ingredients</h3>
        <ul className="modal-ingredients">
          {ingredients.map((ing, idx) => (
            <li key={idx}>{ing}</li>
          ))}
        </ul>
        <h3>Instructions</h3>
        <p className="modal-instructions">{instructions}</p>
      </div>
    </div>
  );
};

export default RecipeModal;