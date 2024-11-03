// App.js

// Import necessary components from React Router DOM for routing
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import the Home and CreatePost components
import Home from './Home';
import CreatePost from './CreatePost.jsx';

// Import the CSS stylesheet for the app
import './App.css';

// Define the main App component
function App() {
  return (
    // Wrap the app in a Router to enable routing
    <Router>
      <div className="app">
        {/* Navigation bar */}
        <nav>
          <ul>
            {/* Link to the Home page */}
            <li>
              <Link to="/">Home</Link>
            </li>
            {/* Link to the Create Post page */}
            <li>
              <Link to="/create">Create Post</Link>
            </li>
          </ul>
        </nav>

        {/* Routes for different pages */}
        <Routes>
          {/* Route for the Create Post page */}
          <Route path="/create" element={<CreatePost />} />
          {/* Default route for the Home page */}
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

// Export the App component as the default export
export default App;