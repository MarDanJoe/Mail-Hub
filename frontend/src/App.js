import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import EmailList from './components/EmailList';
import ComposeEmail from './components/ComposeEmail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/emails" element={<EmailList />} />
        <Route path="/compose" element={<ComposeEmail />} />
      </Routes>
    </Router>
  );
}

export default App;
