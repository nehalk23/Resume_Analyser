import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Student from "./student";
import Manager from "./manger";
import "./App.css"; // Your existing CSS file

const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to Resume Analyzer</h1>
        </header>

        <Routes>
          {/* Home page with Student and Manager options */}
          <Route path="/" element={<Home />} />

          {/* Student page */}
          <Route path="/student" element={<Student />} />

          {/* Manager page */}
          <Route path="/manager" element={<Manager />} />
        </Routes>
      </div>
    </Router>
  );
};

// Home component with buttons for Student and Manager
const Home = () => {
  return (
    <div className="home-container">
      {/* The "Select Your Role" message as a block */}
      <div className="role-box role-message">
        <h2>Select Your Role</h2>
      </div>
      
      <div className="role-selection">
        <div className="role-box student-box">
          <h3>Student</h3>
          <Link to="/student">
            <button className="role-button">Go to Student Page</button>
          </Link>
        </div>
        <div className="role-box manager-box">
          <h3>Manager</h3>
          <Link to="/manager">
            <button className="role-button">Go to Manager Page</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default App;
