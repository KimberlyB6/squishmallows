import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './css/index.css';
import Home from './pages/Home';
import Layout from './Layout';
import Desserts from './pages/Desserts';
import NoPage from './pages/NoPages';
import Music from './pages/Music';
import Shop from './pages/Shop';
import Gallery from './pages/Gallery';

const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="desserts" element={<Desserts />} />
          <Route path="Gallery" element={<Gallery />} />
          <Route path="music" element={<Music />} />
          <Route path="shop" element={<Shop />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);