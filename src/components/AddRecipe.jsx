const AddRecipe = ({ updateRecipes, editingRecipe = null, onEditSuccess, onDeleteSuccess }) => {
  const [result, setResult] = useState("");
  const [prevSrc, setPrevSrc] = useState(editingRecipe?.img_name || "");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const isEditing = Boolean(editingRecipe);
  const API_BASE = "https://squish-backend-1.onrender.com";

  const uploadImage = (e) => setPrevSrc(URL.createObjectURL(e.target.files[0]));

  const openAddDialog = (e) => {
    e.preventDefault();
    setShowAddDialog(true);
  };
  const closeAddDialog = () => setShowAddDialog(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(isEditing ? "…Updating" : "…Sending");

    const formData = new FormData(e.target);
    const url = isEditing
      ? `${API_BASE}/api/squish/${editingRecipe._id}`
      : `${API_BASE}/api/squish`;

    const method = isEditing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      setResult(isEditing ? "Recipe Updated!" : "Recipe Added!");
      isEditing ? onEditSuccess(data) : updateRecipes(data);
      e.target.reset();
      setPrevSrc("");
      closeAddDialog();
    } else {
      const errorText = await res.text();
      setResult("Error: " + errorText);
    }
  };

  const handleDelete = async () => {
    setResult("Deleting...");
    try {
      const res = await fetch(`${API_BASE}/api/squish/${editingRecipe._id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setResult("Deleted successfully");
        onDeleteSuccess(editingRecipe._id);
        closeAddDialog();
      } else {
        const errorText = await res.text();
        setResult("Error: " + errorText);
      }
    } catch (err) {
      setResult("Error deleting recipe");
    }
  };

  return (
    <div id="add-recipe-plan">
      <button onClick={openAddDialog} className="add-recipe-btn" label={isEditing ? "Edit Recipe" : "Add Recipe"}>
        {isEditing ? "✎" : "+"}
      </button>

      {showAddDialog && (
        <div className="modal-backdrop" onClick={closeAddDialog}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeAddDialog}>
              &times;
            </button>

            <form id="add-recipe-form" onSubmit={handleSubmit}>
              <h3>{isEditing ? "Edit Recipe" : "Create New Recipe"}</h3>

              <p>
                <label htmlFor="name">Recipe Name: </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  minLength={3}
                  defaultValue={editingRecipe?.name || ""}
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
                  defaultValue={editingRecipe?.description || ""}
                />
              </p>

              <p>
                <label htmlFor="ingredients">Ingredients (one per line): </label>
                <textarea
                  id="ingredients"
                  name="ingredients"
                  required
                  minLength={3}
                  rows={4}
                  defaultValue={editingRecipe?.ingredients?.join("\n") || ""}
                />
              </p>

              <p>
                <label htmlFor="instructions">Instructions (one per line): </label>
                <textarea
                  id="instructions"
                  name="instructions"
                  required
                  minLength={3}
                  rows={4}
                  defaultValue={editingRecipe?.instructions?.join("\n") || ""}
                />
              </p>

              <section className="columns">
                <div>
                  {prevSrc && (
                    <img
                      id="img-prev"
                      src={prevSrc.startsWith("blob") ? prevSrc : `${API_BASE}/${prevSrc}`}
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

              <button type="submit">{isEditing ? "Update" : "Submit"}</button>

              {isEditing && (
                confirmingDelete ? (
                  <>
                    <p>Are you sure you want to delete?</p>
                    <button type="button" onClick={handleDelete}>Yes, Delete</button>
                    <button type="button" onClick={() => setConfirmingDelete(false)}>Cancel</button>
                  </>
                ) : (
                  <button type="button" onClick={() => setConfirmingDelete(true)}>Delete</button>
                )
              )}

              <p>{result}</p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddRecipe;