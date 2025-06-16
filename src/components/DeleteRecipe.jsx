import { useState } from "react";

const DeleteRecipe = ({ recipeId, onDelete }) => {
  const [result, setResult] = useState("");
  const [confirming, setConfirming] = useState(false);
  const API_BASE = "https://squish-backend-1.onrender.com";

  const handleDelete = async () => {
    setResult("Deleting...");
    try {
      const res = await fetch(`${API_BASE}/api/squish/${recipeId}`, {
        method: "DELETE"
      });

      if (res.ok) {
        setResult("Deleted successfully");
        onDelete(recipeId);
        setConfirming(false);
      } else {
        const errorText = await res.text();
        setResult("Error: " + errorText);
      }
    } catch (err) {
      setResult("Error deleting recipe");
    }
  };

  return (
    <div>
      {confirming ? (
        <div className="confirm-delete">
          <p>Are you sure?</p>
          <button onClick={handleDelete}>Yes</button>
          <button onClick={() => setConfirming(false)}>No</button>
          <p>{result}</p>
        </div>
      ) : (
        <button onClick={() => setConfirming(true)}>Delete</button>
      )}
    </div>
  );
};

export default DeleteRecipe;