import "../css/dialog.css";
import "../css/AddRecipe.css";
import { useState } from "react";

const EditRecipe = ({ recipe, onSuccess }) => {
  const [result, setResult] = useState("");
  const [prevSrc, setPrevSrc] = useState(recipe.img_name);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const API_BASE = "https://squish-backend-1.onrender.com";

  const uploadImage = (e) => setPrevSrc(URL.createObjectURL(e.target.files[0]));

  const openEditDialog = () => setShowEditDialog(true);
  const closeEditDialog = () => setShowEditDialog(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult("…Updating");

    const formData = new FormData(e.target);
    const res = await fetch(`${API_BASE}/api/squish/${recipe._id}`, {
      method: "PUT",
      body: formData,
    });

    if (res.ok) {
      const updated = await res.json();
      setResult("Recipe Updated!");
      onSuccess(updated);
      closeEditDialog();
    } else {
      const errorText = await res.text();
      setResult("Error: " + errorText);
    }
  };

  const handleDelete = async () => {
    setResult("Deleting...");
    try {
      const res = await fetch(`${API_BASE}/api/squish/${recipe._id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setResult("Deleted successfully");
        onSuccess(null);
        closeEditDialog();
      } else {
        const errorText = await res.text();
        setResult("Error: " + errorText);
      }
    } catch (err) {
      setResult("Error deleting recipe");
    }
  };

  return (
    <>
      <button onClick={openEditDialog}>Edit</button>
      {showEditDialog && (
        <div className="modal-backdrop" onClick={closeEditDialog}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeEditDialog}>&times;</button>
            <form onSubmit={handleSubmit}>
              <h3>Edit Recipe</h3>
              <p>
                <label htmlFor="name">Recipe Name:</label>
                <input type="text" name="name" defaultValue={recipe.name} required minLength={3} />
              </p>
              <p>
                <label htmlFor="description">Description:</label>
                <input type="text" name="description" defaultValue={recipe.description} required minLength={3} />
              </p>
              <p>
                <label htmlFor="ingredients">Ingredients:</label>
                <textarea name="ingredients" defaultValue={recipe.ingredients.join("\n")} required minLength={3} rows={4} />
              </p>
              <p>
                <label htmlFor="instructions">Instructions:</label>
                <textarea name="instructions" defaultValue={recipe.instructions.join("\n")} required minLength={3} rows={4} />
              </p>
              <section className="columns">
                <div>{prevSrc && <img id="img-prev" src={`${API_BASE}/${prevSrc}`} alt="preview" />}</div>
                <p id="img-upload">
                  <label htmlFor="img">Upload Image:</label>
                  <input type="file" name="img" accept="image/*" onChange={uploadImage} />
                </p>
              </section>
              <button type="submit">Update</button>
              {confirming ? (
                <>
                  <p>Are you sure you want to delete?</p>
                  <button type="button" onClick={handleDelete}>Yes, Delete</button>
                  <button type="button" onClick={() => setConfirming(false)}>Cancel</button>
                </>
              ) : (
                <button type="button" onClick={() => setConfirming(true)}>Delete</button>
              )}
              <p>{result}</p>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditRecipe;