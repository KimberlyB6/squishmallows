import React, { useState } from 'react';
import '../css/Home.css';
import Hero from '../components/Hero';
import ContactSection from '../components/ContactSection';

const Home = () => {
  const [active, setActive] = useState(null);

  const recipes = [
    {
      _id: 4,
      name: 'Lemon Pound Cake',
      img: '/images/desserts/lemonpoundcake.webp',
      description:
        'A rich, buttery pound cake infused with bright lemon zest and juice.',
      ingredients: [
        '2 cups all-purpose flour',
        '1 ½ cups granulated sugar',
        '1 cup unsalted butter, room temp',
        '3 large eggs',
        'Zest and juice of 2 lemons',
        '1 tsp baking powder',
        '½ tsp salt'
      ],
      instructions: [
        'Preheat oven to 350°F (175°C).',
        'Cream butter and sugar until light and fluffy.',
        'Beat in eggs one at a time, then stir in lemon zest and juice.',
        'Whisk flour, baking powder, and salt; fold into batter.',
        'Pour into a greased loaf pan and bake 55–60 minutes.',
        'Let cool 10 minutes before slicing.'
      ]
    },
    {
      _id: 5,
      name: 'Apple Pie',
      img: '/images/desserts/applepie.webp',
      description:
        'Classic double-crust apple pie with juicy cinnamon apples.',
      ingredients: [
        '2 pie crusts (store-bought or homemade)',
        '6 cups thinly sliced apples',
        '¾ cup sugar',
        '2 tbsp flour',
        '1 tsp ground cinnamon',
        '¼ tsp nutmeg',
        '1 tbsp lemon juice'
      ],
      instructions: [
        'Preheat oven to 425°F (220°C).',
        'Toss apples with sugar, flour, spices, and lemon juice.',
        'Line pie dish with bottom crust and fill with apple mixture.',
        'Cover with top crust; crimp edges and cut vents.',
        'Bake 20 minutes, reduce heat to 350°F and bake 30–35 more.',
        'Cool at least 2 hours before serving.'
      ]
    },
    {
      _id: 9,
      name: 'Frosted Red Velvet Cookies',
      img: '/images/desserts/redvelvet.jpg',
      description:
        'Soft red velvet cookies topped with a creamy vanilla frosting.',
      ingredients: [
        '1 box red velvet cake mix',
        '1 egg',
        '½ cup vegetable oil',
        '1 cup powdered sugar',
        '2 tbsp milk',
        '½ tsp vanilla extract'
      ],
      instructions: [
        'Preheat oven to 350°F (175°C).',
        'Mix cake mix, egg, and oil until a dough forms.',
        'Drop by tablespoons onto baking sheet; bake 8–10 minutes.',
        'Whisk powdered sugar, milk, and vanilla to make frosting.',
        'When cookies cool, spread frosting on top.'
      ]
    },
    {
      _id: 2,
      name: 'Strawberry Shortcake',
      img: '/images/desserts/strawberrycake.jpg',
      description:
        'Fluffy shortcakes layered with fresh strawberries and whipped cream.',
      ingredients: [
        '2 cups flour',
        '1⁄4 cup sugar',
        '1 tbsp baking powder',
        '½ tsp salt',
        '6 tbsp cold butter',
        '⅔ cup milk',
        '2 cups sliced strawberries',
        '1 cup whipped cream'
      ],
      instructions: [
        'Preheat oven to 425°F (220°C).',
        'Combine dry ingredients; cut in butter until crumbly.',
        'Stir in milk until just combined, drop onto baking sheet.',
        'Bake 12–15 minutes until golden.',
        'Split shortcakes, fill with strawberries and whipped cream.'
      ]
    }
  ];

  return (
    <>
      <Hero />      
      <section className="recipe-section">
        <h2>Desserts</h2>
        <div className="recipe-list">
          {recipes.map(r => (
            <div
              key={r._id}
              className="card"
              onClick={() => setActive(r)}
            >
              <div className="card-img">
                <img src={r.img} alt={r.name} />
              </div>
              <div className="card-footer">{r.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
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
              src={active.img}
              alt={active.name}
              style={{
                width: '100%',
                maxHeight: '300px',
                objectFit: 'cover',
                marginBottom: '16px'
              }}
            />
            <p>{active.description}</p>
            <h3>Ingredients</h3>
            <ul>
              {active.ingredients.map((i, idx) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>
            <h3>Instructions</h3>
            <ol>
              {active.instructions.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      )}
      <ContactSection />
    </>
  );
};

export default Home;