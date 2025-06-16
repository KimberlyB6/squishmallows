import "../css/dialog.css";
import "../css/AddRecipe.css";
import { useState } from "react";

const AddRecipe = ({ updateRecipes }) => {
  const [result, setResult] = useState("");
  const [prevSrc, setPrevSrc] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);

  const uploadImage = (e) => setPrevSrc(URL.createObjectURL(e.target.files[0]));

  const openAddDialog = (e) => {
    e.preventDefault();
    setShowAddDialog(true);
  };
  const closeAddDialog = () => setShowAddDialog(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult("…Sending");

    const formData = new FormData(e.target);
    const API_BASE = "https://squish-backend-1.onrender.com";
    const res = await fetch(`${API_BASE}/api/squish`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const newRecipe = await res.json();
      setResult("Recipe Added!");
      updateRecipes(newRecipe);
      e.target.reset();
      setPrevSrc("");
      closeAddDialog();
    } else {
      const errorText = await res.text();
      setResult("Error: " + errorText);
    }
  };

  return (
    <div id="add-recipe-plan">
      <button onClick={openAddDialog} className="add-recipe-btn" label="Add Recipe">
        +
      </button>

      {showAddDialog && (
        <div className="modal-backdrop" onClick={closeAddDialog}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} >
            <button className="close-btn" onClick={closeAddDialog}>
              &times;
            </button>

            <form id="add-recipe-form" onSubmit={handleSubmit}>
              <h3>Create New Recipe</h3>

              <p>
                <label htmlFor="name">Recipe Name: </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  minLength={3}
                />
              </p>

              <p>
                <label htmlFor="description">Description: </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  required
                  minLength={3}
                />
              </p>

              <p>
                <label htmlFor="ingredients">
                  Ingredients (one per line): 
                </label>
                <textarea
                  id="ingredients"
                  name="ingredients"
                  required
                  minLength={3}
                  rows={4}
                />
              </p>

              <p>
                <label htmlFor="instructions">
                  Instructions (one per line): 
                </label>
                <textarea
                  id="instructions"
                  name="instructions"
                  required
                  minLength={3}
                  rows={4}
                />
              </p>

              <section className="columns">
                <div>
                  {prevSrc && (
                    <img
                      id="img-prev"
                      src={prevSrc}
                      alt="preview"
                    />
                  )}
                </div>
                <p id="img-upload">
                  <label htmlFor="img">Upload Image:</label>
                  <input
                    type="file"
                    id="img"
                    name="img"
                    accept="image/*"
                    onChange={uploadImage}
                  />
                </p>
              </section>

              <button type="submit">Submit</button>
              <p>{result}</p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddRecipe;
