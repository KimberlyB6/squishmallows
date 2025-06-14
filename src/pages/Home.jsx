import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Home.css';
import Hero from '../components/Hero';
import ContactSection from '../components/ContactSection';

const API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://squish-backend-1.onrender.com"
    : "http://localhost:3002";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [active, setActive]   = useState(null);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const res = await axios.get('${API_BASE}');
        const featuredNames = [
          'Lemon Pound Cake',
          'Apple Pie',
          'Frosted Red Velvet Cookies',
          'Strawberry Shortcake'
        ];
        const featured = res.data.filter(r =>
          featuredNames.includes(r.name)
        );
        setRecipes(featured);
      } catch (err) {
        console.error('Failed to fetch recipes:', err);
      }
    };
    loadRecipes();
  }, []);

  return (
    <>
      <Hero />

      <section className="recipe-section">
        <h2>Featured Desserts</h2>
        <div className="recipe-list">
          {recipes.map(r => (
            <div
              key={r._id}
              className="card"
              onClick={() => setActive(r)}
            >
              <div className="card-img">
                <img src={`${API_BASE}/${r.img_name}`} alt={r.name}/>
              </div>
              <div className="card-footer">{r.name}</div>
            </div>
          ))}
        </div>
      </section>

      {active && (
        <div
          id="recipe-modal"
          className="modal-backdrop"
          style={{ display: 'flex' }}
          onClick={() => setActive(null)}
        >
          <div
            className="modal-content"
            onClick={e => e.stopPropagation()}
          >
            <span
              className="close-btn"
              onClick={() => setActive(null)}
            >
              &times;
            </span>
            <h2>{active.name}</h2>
            <img
              src={`${API_BASE}/${active.img_name}`}
              alt={active.name}
              style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', marginBottom: '16px'}} />
            <p>{active.description}</p>

            <h3>Ingredients</h3>
            <ul>
              {active.ingredients.map((ing,i) => <li key={i}>{ing}</li>)}
            </ul>

            <h3>Instructions</h3>
            <ol>
              {active.instructions.map((step,i) => <li key={i}>{step}</li>)}
            </ol>
          </div>
        </div>
      )}

      <ContactSection />
    </>
  );
};

export default Home;