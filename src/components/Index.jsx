import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/style.css';

const Index = () => (
  <div>
    <div className="top-hero">
      <div className="container">
        <div className="top-hero-text">
          <h1>Welcome to Fast-Food-Fast</h1>
          <p>Your number one food ordering platform.</p>
          <p>
            FFF is an application where customers can place order for meals daily and get it
            delivered to them in a Split Second
          </p>
        </div>
        <div className="top-hero-btn">
          <button type="button" className="blue-bg-colour ">
            <Link to="/login" className="white-text">Order now</Link>
          </button>
          <button type="button" className="green-bg">
            <Link to="/signup" className="white-text">Sign up now</Link>
          </button>
        </div>
      </div>
    </div>
  This is index
    <p className="Class-inro">Hello my people</p>
  </div>
);

export default Index;
