import React, { useEffect, useState } from 'react';
import '../css/Hero.css';

const slides = [
  '/images/home/Cake Squish.png',
  '/images/home/full.png',
  '/images/home/cutedesserts.png'
];

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(i => (i + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className='hero-container'>
      <section className='hero-slider'>
        {slides.map((bg, idx) => (
          <div
            key={idx}
            className={`slide ${idx === activeIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url('${bg}')` }}
          />
        ))}
      </section>
      <img src='/images/home/welcomee.png' className='mobile-hero' alt='Welcome' />
    </section>
  );
};

export default Hero;