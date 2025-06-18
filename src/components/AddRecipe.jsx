import "../css/AddRecipe.css";
import { useState, useEffect } from "react";

const API_BASE = "https://squish-backend-1.onrender.com";

const AddRecipe = ({ updateRecipes, editingRecipe = null, onEditSuccess = null, resetFormTrigger = false }) => {
  const [result, setResult] = useState("");
  const [prevSrc, setPrevSrc] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [img, setImg] = useState(null);

  const resetForm = () => {
  setName("");
  setDescription("");
  setIngredients("");
  setInstructions("");
  setImg(null);
  setPrevSrc("");
};

useEffect(() => {
  if (resetFormTrigger) resetForm();
}, [resetFormTrigger]);



  useEffect(() => {
    if (editingRecipe) {
      setShowDialog(true);
      setName(editingRecipe.name);
      setDescription(editingRecipe.description);
      setIngredients(editingRecipe.ingredients.join("\n"));
      setInstructions(editingRecipe.instructions.join("\n"));
      setPrevSrc(`${API_BASE}/${editingRecipe.img_name}`);
    }
  }, [editingRecipe]);

  const uploadImage = (e) => {
    const file = e.target.files[0];
    setImg(file);
    setPrevSrc(URL.createObjectURL(file));
  };

  const openAddDialog = (e) => {
    e.preventDefault();
    setShowDialog(true);
  };
  const closeAddDialog = () => {
    setShowDialog(false);
    setResult("");
    setImg(null);
    resetForm();

    if (!editingRecipe) {
      setName("");
      setDescription("");
      setIngredients("");
      setInstructions("");
      setImg(null);
      setPrevSrc("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult("…Sending");

    if (name.length < 3 || description.length < 3 || ingredients.length < 3 || instructions.length < 3) {
      setResult("❌ All fields must be at least 3 characters.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("ingredients", ingredients);
    formData.append("instructions", instructions);
    if (img) formData.append("img", img);

    try {
      const res = editingRecipe
        ? await fetch(`${API_BASE}/api/squish/${editingRecipe._id}`, {
            method: "PUT",
            body: formData,
          })
        : await fetch(`${API_BASE}/api/squish`, {
            method: "POST",
            body: formData,
          }); 
      const data = await res.json();
      console.log("Data retrieved is " + data);

      if (res.ok) {
        setResult("✅ Success!");
        if (editingRecipe && onEditSuccess) {
          onEditSuccess(data);
        } else {
          updateRecipes(data);
        }
        closeAddDialog();
      } else {
        setResult("❌ " + (data.message || "Error saving recipe"));
      }
    } catch (err) {
      console.error(err);
      setResult("❌ Network error");
    }
  };

  return (
    <div id="add-recipe-plan">
      {!editingRecipe && (
        <button onClick={openAddDialog} className="add-recipe-btn" label="Add Recipe">
          +
        </button>
      )}

      {showDialog && (
        <div className="modal-backdrop" onClick={closeAddDialog}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeAddDialog}>
              &times;
            </button>

            <form id="add-recipe-form" onSubmit={handleSubmit}>
              <h3>{editingRecipe ? "Edit Recipe" : "Create New Recipe"}</h3>

              <p>
                <label htmlFor="name">Recipe Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  minLength={3}
                />
              </p>

              <p>
                <label htmlFor="description">Description:</label>
                <input
                  type="text"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  minLength={3}
                />
              </p>

              <p>
                <label htmlFor="ingredients">Ingredients (one per line):</label>
                <textarea
                  id="ingredients"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  required
                  minLength={3}
                />
              </p>

              <p>
                <label htmlFor="instructions">Instructions (one per line):</label>
                <textarea
                  id="instructions"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  required
                  minLength={3}
                />
              </p>

              <section className="columns">
                <div>
                  {prevSrc && (
                    <img id="img-prev" src={prevSrc} alt="preview" />
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