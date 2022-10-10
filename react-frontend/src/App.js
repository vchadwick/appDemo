import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';

function Example() {
  useEffect(() => {
    document.title = 'My Page Title';
  });
}

function App() {
  Example();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to the Frontend
        </p>
      </header>
    </div>
  );
}

export default App;
