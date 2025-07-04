// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // We'll create this Home page component next

const App = () => {
  return (
    // The main container for your entire application
    // Using inline styles here, but you can put these in a CSS file if preferred
    <main style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <Router>
        {/* Routes define which component to render based on the URL path */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Placeholder routes for future pages. We will build these later. */}
          {/*
          <Route path="/about" element={<div>About Page Content</div>} />
          <Route path="/projects" element={<div>Projects Page Content</div>} />
          <Route path="/contact" element={<div>Contact Page Content</div>} />
          */}
        </Routes>
      </Router>
    </main>
  );
};

export default App;