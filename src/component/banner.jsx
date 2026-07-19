import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="hero-tag">Fresh drops • Premium essentials</p>
        <h1>Elevate your everyday style</h1>
        <p>Discover curated looks for men, women, and kids with a modern edge.</p>
        <div className="hero-actions">
          <Link to="/products/women" className="btn hero-btn">Shop Women</Link>
          <Link to="/products/men" className="btn hero-btn secondary">Shop Men</Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;